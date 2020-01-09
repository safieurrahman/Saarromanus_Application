import { Component } from '@angular/core';
import { Location } from './entity/Location';
@Component({
  selector: 'ngx-route',
  templateUrl: './create.component.html',
})
export class HistoricRoutesCreateComponent {
  searchedLocation: Location = new Location();
  updateLocation(event: Location) {
    this.searchedLocation = new Location(event.latitude, event.longitude);
  }
}
