import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'ngx-gmaps',
  styleUrls: ['./routes.component.scss'],
  templateUrl: './routes.component.html',

})
export class RoutesComponent {

  public travelMode: string = 'BICYCLING' //gives directions for bicycles

  lat: Number = 41.85
  lng: Number = -87.65

  origin = { lat: 29.8174782, lng: -95.6814757 }
  destination = { lat: 40.6976637, lng: -74.119764 }
  waypoints = [
     {location: { lat: 39.0921167, lng: -94.8559005 }},
     {location: { lat: 42.8339037, lng: -87.8720468 }}
  ]

  public renderOptions: any = {
    draggable: true,
    suppressMarkers: false,
    suppressInfoWindows: false,
}

  public markerOptions = {
    origin: {
        infoWindow: 'This is origin.',
        draggable: true,
    },
    destination: {
        infoWindow: 'This is destination.',
        draggable: true,
        opacity: 0.8,
    },
    waypoints: [
      {
        draggable: true,
        opacity: 0.8,
      },
      {
        draggable: true,
        opacity: 0.8,
      },
    ]
}



}

