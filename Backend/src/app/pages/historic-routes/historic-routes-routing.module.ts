import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricRoutesViewComponent } from './view/view.component';
import { HistoricRouteDetailComponent } from "./detail/detail.component";
import { HistoricRoutesComponent } from "./historic-routes.component";



const routes: Routes = [{
  path: '',
  component: HistoricRoutesComponent,
  children: [
    {
      path: 'view',
      component: HistoricRoutesViewComponent,
    },
    {
      path: 'create',
      component: HistoricRouteDetailComponent,
    },
    {
      path: 'detail/:id',
      component: HistoricRouteDetailComponent,
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
    HistoricRoutesComponent,
    HistoricRouteDetailComponent,
];
