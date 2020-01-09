import { NgModule } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../entity/Location';
import { MouseEvent } from '@agm/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'ngx-maproute',
  templateUrl: './maproute.component.html',
  styleUrls: ['./maproute.component.scss'],
})
export class MapRouteComponent implements OnInit {
  zoom: number = 15;

  latitude:number = 49.239486;
  longitude:number = 6.994886; 

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

  @Input()
  public set searchedLocation(searchedLocation: Location) {
    this.latitude = searchedLocation.latitude;
    this.longitude = searchedLocation.longitude;
    this.zoom = 15;
  }

  ngOnInit(): void {
    // set up current location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.searchedLocation = new Location(
          position.coords.latitude, position.coords.longitude,
        );
      });
    }
  }
  
  clickedMarker(label: string, index: number) 
  {
    this.markers.splice(index,1);
    console.log(`Deleted the marker: ${label || index}`);
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
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
	latitude: number;
	longitude: number;
	label?: string;
	draggable: boolean;
}

