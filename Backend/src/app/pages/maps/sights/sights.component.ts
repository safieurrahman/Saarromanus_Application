import { Component } from '@angular/core';
import { Location } from './entity/Location';

@Component({
  selector: 'ngx-sights',
  templateUrl: './sights.component.html',
})
export class SightsComponent {

  searchedLocation: Location = new Location();

  updateLocation(event: Location) {
    this.searchedLocation = new Location(event.latitude, event.longitude);
  }
}
