import { Component, OnInit, NgZone, ViewChild, ElementRef, } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class SightsDetailComponent implements OnInit {
  objectId: string;
  objectDoc: any;
  objectData: any;
  latitude: number = 49.239486;
  longitude: number = 6.994886;
  zoom: number = 15;
  address: string;
  sight_categories: any;
  private geoCoder;
  fileReader: FileReader = new FileReader();
  prev_imagesArray: any = [];
  prev_audioArray: any = [];
  imagesArray: any = [];
  audioArray: any = [];
  submitted = false;

  @ViewChild('search', {static:true})
  public searchElementRef: ElementRef;
  
  sightForm = new FormGroup({
    name_de: new FormControl('', Validators.required),
    name_fr: new FormControl('', Validators.required),
    name_en: new FormControl('', Validators.required),
    information_de: new FormControl('', Validators.required),
    information_fr: new FormControl('', Validators.required),
    information_en: new FormControl('', Validators.required),
    sight_category: new FormControl('', Validators.required),
    images_details:  new FormArray([])
  });

  constructor( private afs: AngularFirestore, 
      private route: ActivatedRoute, private router: Router,
      private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
      private afStorage: AngularFireStorage,
      private formBuilder: FormBuilder
    ) {
      // this.sight_categories = {};
      this.afs.collection('sight_categories').valueChanges({idField: 'id'}).subscribe(res => {
        this.sight_categories = res;
      });
      route.params.subscribe(params => {
        this.objectId = params.id == null ? null : params.id;
        if(this.objectId !== null) {
          this.objectDoc = this.afs.doc('historic_sites/'+this.objectId);
          this.objectDoc.valueChanges().subscribe(res => {
            this.longitude = res.geolocation._long;
            this.latitude = res.geolocation._lat;
            this.audioArray = res.audio_array;
            this.imagesArray = res.images_array;
            this.prev_imagesArray = res.images_array.map(x => ({downloadURL: x.downloadURL, path: x.path}));
            this.prev_audioArray = [...res.audio_array];
            this.sightForm.patchValue({
              'name_de': res.de.name,
              'name_fr': res.fr.name,
              'name_en': res.en.name,
              'information_de': res.de.information,
              'information_fr': res.fr.information,
              'information_en': res.en.information,
              'sight_category': res.sight_category.id,
              'images_details': res.images_array.map(x => {
                this.t.push(this.formBuilder.group({
                  description_fr: ['', Validators.required],
                  description_en: ['', Validators.required],
                  description_de: ['', Validators.required],
                  title_de: ['', Validators.required],
                  title_en: ['', Validators.required],
                  title_fr: ['', Validators.required]
                }));
                return {
                  title_de: !!x.de ? x.de.title : '' ,
                  description_de: !!x.de ? x.de.description : '',
                  title_fr: !!x.de ? x.fr.title : '',
                  description_fr: !!x.de ? x.fr.description : '',
                  title_en: !!x.de ? x.en.title : '',
                  description_en: !!x.de ? x.en.description : '',
                }
              })
            });
          });
        }
      });
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
       this.setCurrentLocation();        
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: []
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event['coords']['lat'];
    this.longitude = $event['coords']['lng'];
  }

  private async handleFiles(prevArray, fileArray, folder) {
    const ref_array = [];
    const deleted_ref = prevArray.filter(px => {
      const found = fileArray.find(x => !x.downloadURL ? false : x.downloadURL == px.downloadURL );
      if(found == null) {
        return px;
      }
    });
    for(let dx of deleted_ref) {
      try {
        await this.afStorage.storage.refFromURL(dx.downloadURL).delete();        
      } catch(err) {
        console.log(err);
      }
    };
    for (let x of fileArray) {
      if(!!x.file) {
        ref_array.push(await this.startUpload(x.file, folder));
      } else {
        ref_array.push(x);
      }
    }
    return ref_array;
  }

  // convenience getter for easy access to form fields
  get f() { return this.sightForm.controls; }
  get t() { return this.f.images_details as FormArray; }


  public async onSubmit() {
    this.submitted = true;

    if (this.sightForm.invalid) {
      return;
    }

    const images_ref = await this.handleFiles(this.prev_imagesArray, this.imagesArray, 'images');
    const audio_ref = await this.handleFiles(this.prev_audioArray, this.audioArray, 'audio');
    const image_detail_refs = images_ref.map((x, i) => {
      return {
        ...x, 
        de: {
          title: this.t.value[i].title_de,
          description: this.t.value[i].description_de
        },
        fr: {
          title: this.t.value[i].title_fr,
          description: this.t.value[i].description_fr
        },
        en: {
          title: this.t.value[i].title_en,
          description: this.t.value[i].description_en
        }
      };
    });


    // stop here if form is invalid
    const result = {
      de: {
        name : this.sightForm.value.name_de,
        information: this.sightForm.value.information_de
      },
      en: {
        name : this.sightForm.value.name_en,
        information: this.sightForm.value.information_en
      },
      fr: {
        name : this.sightForm.value.name_fr,
        information: this.sightForm.value.information_fr
      },
      geolocation: {
        _lat: this.latitude,
        _long: this.longitude
      },
      sight_category: this.afs.doc('sight_categories/'+this.sightForm.value.sight_category).ref,
      images_array: image_detail_refs,
      audio_array: audio_ref
    }
    if(this.objectId == null) { 
      this.afs.collection('historic_sites').add(result).then(() => {
        this.router.navigate(['/pages/sights/view']);
      });
    } else {
      this.afs.doc('historic_sites/'+this.objectId).set(result).then(() => {
        this.router.navigate(['/pages/sights/view']);
      })
    } 

  }

  uploadFile(fileList, mode) {
    if(mode == 'audio') {
      this.saveAudios(fileList);
    } else {
      this.saveImages(fileList);
    }
  }

  private saveImages(fileList) {
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      this.fileReader.readAsDataURL(element);
      this.fileReader.onloadend = () => {
        this.imagesArray.push({
          file: element, 
          src: this.fileReader.result
          });
      }
    }
    this.t.push(this.formBuilder.group({
      description_fr: ['', Validators.required],
      description_en: ['', Validators.required],
      description_de: ['', Validators.required],
      title_de: ['', Validators.required],
      title_en: ['', Validators.required],
      title_fr: ['', Validators.required],
    }));
  }

  private saveAudios(fileList) {
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      this.audioArray.push({
        file: element,
        name: element.name
      })
    }
  }

  private async startUpload(file, main_folder) {
    // The storage path
    const path = `${main_folder}/${Date.now()}_${file.name}`;

    // Reference to storage bucket
    const ref = this.afStorage.ref(path);

    // The main task
    const task = this.afStorage.upload(path, file);
    const snapshot = await task.snapshotChanges().toPromise()
    const downloadURL = await ref.getDownloadURL().toPromise();
    return {downloadURL, path};
  }

  deleteAttachment(index, mode: string) {
    const targetArray = mode == 'audio' ? this.audioArray : this.imagesArray;
    targetArray.splice(index, 1)
    if (mode == 'images') {
      this.t.removeAt(index);
    }
  }
}
