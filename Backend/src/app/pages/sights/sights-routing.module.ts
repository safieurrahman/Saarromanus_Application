import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SightsViewComponent } from './view/view.component';

const routes: Routes = [{
  path: '',
  component: SightsViewComponent,
  children: [
    {
      path: 'sight-view',
      component: SightsViewComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SightsRoutingModule { }

export const routedComponents = [
    SightsViewComponent
];
