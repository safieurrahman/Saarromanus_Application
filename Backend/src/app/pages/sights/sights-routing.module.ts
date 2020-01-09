import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SightsViewComponent } from './view/view.component';
import { SightCreateComponent } from './create/create.component';
import { MapComponent } from './create/map/map.component';
import { SearchComponent } from './create/search/search.component';
import { SightsComponent } from './sights.component';


const routes: Routes = [{
  path: '',
  component: SightsComponent,
  children: [{
    path: 'create',
    component: SightCreateComponent,
  }, {
    path: 'view',
    component: SightsViewComponent,
  }
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SightsRoutingModule { }

export const routedComponents = [
    SightsComponent,
    SightsViewComponent,
    SightCreateComponent,
    MapComponent,
    SearchComponent
];
