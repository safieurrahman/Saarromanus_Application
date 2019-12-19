import { Component, Input } from '@angular/core';
import { MouseEvent } from '@agm/core';
import { marker } from 'leaflet';
import { Location } from '../search-map/entity/Location'; // for future implementation of search bar
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-sights',
  styleUrls: ['./sights.component.scss'],
  templateUrl: './sights.component.html',

})
export class SightsComponent {

  zoom: number = 15;

  lat = 49.239486;
  lng = 6.994886; 

  markers:marker[] = [];
  index: string  = 'M';
  //i:number = 0;

  routeForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
    ) {
    this.createrouteForm();
  }

  routeName = new FormControl([
    //Validators.required,
  ]);

  routeDescription = new FormControl();
  routeType = new FormControl();

  createrouteForm(){
    this.routeForm = this.formBuilder.group({
      routeName: [''],  
      routeDescription: [''],
      routeType: ['']
    });
  }

  ngOnInit(): void {
  }
  
  clickedMarker(label: string, index: number) 
  {
    this.markers.splice(index,1);
    console.log(`Deleted the marker: ${label || index}`);
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      //label: this.index+this.i++,
      label: this.index,
      draggable: false,
    });
    console.log (this.markers);
  }


  public onSubmit() {
    {
    if(this.routeForm.valid)
      {
  
      let new_route = {};
        new_route["name"]=this.routeForm.value.roueName;
        new_route["description"]=this.routeForm.value.routeDescription;
        new_route["type"]=this.routeForm.value.routeType;
        //new_route["longiitude"]=this.longitude;
        //new_route["latitude"]=this.latitude;
      
      console.log('Form data is : ', this.routeForm.value );
      }
    }
  }
  

  

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
