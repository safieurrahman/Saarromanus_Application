import { Component, OnInit, NgZone, ViewChild, ElementRef, } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import { debug } from 'util';


@Component({
  selector: 'ngx-form-layouts',
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html',
})
export class SightsDetailComponent implements OnInit {
  objectId: string;
  objectDoc: any;
  objectData: any;
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  sightForm = new FormGroup({
    name_de: new FormControl(''),
    name_fr: new FormControl(''),
    name_en: new FormControl(''),
    information_de: new FormControl(''),
    information_fr: new FormControl(''),
    information_en: new FormControl('')

  });

  constructor(private afs: AngularFirestore, private router: Router, private route: ActivatedRoute,
     private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    route.params.subscribe(params => {
      this.objectId = params.id == null ? null : params.id;
      if(this.objectId !== null) {
        this.objectDoc = this.afs.doc('historic_sites/'+this.objectId);
        this.objectDoc.valueChanges().subscribe(res => {
          console.log("TRETS", res);
          this.longitude = res.geolocation._long;
          this.latitude = res.geolocation._lat;
          this.sightForm.patchValue({
            'name_de': res.de.name,
            'name_fr': res.fr.name,
            'name_en': res.en.name,
            'information_de': res.de.information,
            'information_fr': res.fr.information,
            'information_en': res.en.information
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
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log(this.latitude, this.longitude);
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
    console.log(this.latitude, this.longitude);
  }

  public onSubmit() {
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
      }
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
}
