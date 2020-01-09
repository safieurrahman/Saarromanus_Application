import { Component } from '@angular/core';
import { Location } from './entity/Location';

@Component({
  selector: 'ngx-create',
  templateUrl: './create.component.html',
})
export class SightCreateComponent {

  searchedLocation: Location = new Location();

  updateLocation(event: Location) {
    this.searchedLocation = new Location(event.latitude, event.longitude);
  }
}
