import { Component, OnInit, NgZone, ViewChild, ElementRef, } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class HistoricRouteDetailComponent implements OnInit {
  objectId: string;
  objectDoc: any;
  objectData: any;
  historic_sites: any;
  latitude: number = 49.239486;
  longitude: number = 6.994886;
  zoom: number = 15;
  address: string;
  routePath: any = [];
  sight_categories: any;
  private geoCoder;
  fileReader: FileReader = new FileReader();
  prev_imagesArray: any = [];
  prev_audioArray: any = [];
  imagesArray: any = [];
  audioArray: any = [];
  sightArray: any = [];
  submitted = false;

  @ViewChild('search', {static:true})
  public searchElementRef: ElementRef;
  
  historicRouteForm = new FormGroup({
    name_de: new FormControl(''),
    name_fr: new FormControl(''),
    name_en: new FormControl(''),
    information_de: new FormControl(''),
    information_fr: new FormControl(''),
    information_en: new FormControl(''),
    sight_category: new FormControl(''),
    google_map_link: new FormControl('')

  });

  constructor( private afs: AngularFirestore, 
      private route: ActivatedRoute, private router: Router,
      private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
      private afStorage: AngularFireStorage,
      private formBuilder: FormBuilder
    ) {
      // this.sight_categories = {};
      this.afs.collection('historic_sites').valueChanges({idField: 'id'}).subscribe(res => {
        this.historic_sites = res;
      });
      route.params.subscribe(params => {
        this.objectId = params.id == null ? null : params.id;
        if(this.objectId !== null) {
          this.objectDoc = this.afs.doc('historic_routes/'+this.objectId);
          this.objectDoc.valueChanges().subscribe(res => {
            this.sightArray = this.historic_sites.filter(px => !!res.sights.find(x => x.id == px.id))
            this.routePath = res.routePath;
            this.audioArray = res.audio_array;
            this.imagesArray = res.images_array;
            this.prev_imagesArray = [...res.images_array];
            this.prev_audioArray = [...res.audio_array];
            this.longitude = this.routePath[0]._long;
            this.latitude = this.routePath[0]._lat;
            this.historicRouteForm.patchValue({
              'name_de': res.de.name,
              'name_fr': res.fr.name,
              'name_en': res.en.name,
              'information_de': res.de.information,
              'information_fr': res.fr.information,
              'information_en': res.en.information,
              'google_map_link': res.google_map_link,
              
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

    this.historicRouteForm = this.formBuilder.group({
      name_de: ['', Validators.required],
      name_fr: ['', Validators.required],
      name_en: ['', Validators.required],
      information_de: ['', Validators.required],
      information_fr: ['', Validators.required],
      information_en: ['', Validators.required],
      google_map_link: ['', Validators.required],
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

  private async handleFiles(prevArray, fileArray, folder) {
    const ref_array = [];
    const deleted_ref = prevArray.filter(px => {
      const found = fileArray.find(x => !x.downloadURL ? false : x.downloadURL == px.downloadURL );
      if(found == null) {
        return px;
      }
    });
    for(let dx of deleted_ref) {
      await this.afStorage.storage.refFromURL(dx.downloadURL).delete();
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
  get f() { return this.historicRouteForm.controls; }

  public async onSubmit() {
    this.submitted = true;


    // stop here if form is invalid
    if (this.historicRouteForm.invalid || this.routePath.length <= 0) {
        return;
    }

    const images_ref = await this.handleFiles(this.prev_imagesArray, this.imagesArray, 'images');
    const audio_ref = await this.handleFiles(this.prev_audioArray, this.audioArray, 'audio');


    const result = {
      de: {
        name : this.historicRouteForm.value.name_de,
        information: this.historicRouteForm.value.information_de
      },
      en: {
        name : this.historicRouteForm.value.name_en,
        information: this.historicRouteForm.value.information_en
      },
      fr: {
        name : this.historicRouteForm.value.name_fr,
        information: this.historicRouteForm.value.information_fr
      },
      routePath: this.routePath,
      sights: this.sightArray.map(x => {
        return this.afs.doc('historic_sites/'+x.id).ref
      }),
      images_array: images_ref,
      audio_array: audio_ref,
      google_map_link: this.historicRouteForm.value.google_map_link,

    }
    debugger;
    if(this.objectId == null) { 
      this.afs.collection('historic_routes').add(result).then(() => {
        this.router.navigate(['/pages/historic-routes/view']);
      });
    } else {
      this.afs.doc('historic_routes/'+this.objectId).set(result).then(() => {
        this.router.navigate(['/pages/historic-routes/view']);
      })
    } 

  }

  addSight(option){
    const found = this.sightArray.find(x => x.de.name == option.de.name);
    if (found == null)
    this.sightArray.push(option);
  }

  deleteSight(i){
    this.sightArray.splice(i, 1);
  }

  uploadFile(fileList, mode) {
    if(mode == 'audio') {
      this.saveAudios(fileList);
    } else {
      this.saveImages(fileList);
    }
  }

  sightMarker() {
    return require('../../../../assets/images/sightMarker.png');
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
  }

  onMapClick($event: MouseEvent) {
    this.routePath.push({
      _lat: $event['coords']['lat'],
      _long: $event['coords']['lng'],
    });
  }

  onMarkerClick(index) {
    if(window.confirm("Are you sure you want to delete this point?")) {
      this.routePath.splice(index, 1);
    }
  }

}