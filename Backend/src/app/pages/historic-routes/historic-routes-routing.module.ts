import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricRoutesViewComponent } from './view/view.component';
import { HistoricRoutesCreateComponent } from "./create/HistoricRoutesCreateComponent";
import { HistoricRoutesComponent } from "./historic-routes.component";

import { MapRouteComponent } from './create/maproute/maproute.component';
import { SearchRouteComponent } from './create/searchroute/searchroute.component';


const routes: Routes = [{
  path: '',
  component: HistoricRoutesComponent,
  children: [
    {
      path: 'create',
      component: HistoricRoutesCreateComponent,
    },
    {
      path: 'view',
      component: HistoricRoutesViewComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoricRoutesRoutingModule { }

export const routedComponents = [
    HistoricRoutesViewComponent,
    HistoricRoutesCreateComponent,
    HistoricRoutesComponent,
    MapRouteComponent,
    SearchRouteComponent
];
