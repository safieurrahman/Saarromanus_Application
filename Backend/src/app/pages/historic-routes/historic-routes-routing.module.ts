import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoricRoutesViewComponent } from './view/view.component';

const routes: Routes = [{
  path: '',
  component: HistoricRoutesViewComponent,
  children: [
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
    HistoricRoutesViewComponent
];
