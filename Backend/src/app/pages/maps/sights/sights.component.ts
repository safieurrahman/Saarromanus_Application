import { Component } from '@angular/core';
import { MouseEvent } from '@agm/core';
@Component({
  selector: 'ngx-sights',
  styleUrls: ['./sights.component.scss'],
  templateUrl: './sights.component.html',

})
export class SightsComponent {

  lat = 49.239486;
  lng = 6.994886; 

  markers:marker[] = [];
  index: string  = 'M';
  i:number = 0;
  
  clickedMarker(label: string, index: number) 
  {
    console.log(`clicked the marker: ${label || index}`);
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      label: this.index+this.i++,
      draggable: true,
    });
    console.log (this.markers);
  }

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
