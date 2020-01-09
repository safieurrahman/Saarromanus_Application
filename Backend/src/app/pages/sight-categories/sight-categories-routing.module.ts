import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SightCategoriesViewComponent } from './view/view.component';

const routes: Routes = [{
  path: '',
  component: SightCategoriesViewComponent,
  children: [
    {
      path: 'view',
      component: SightCategoriesViewComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SightCategoriesRoutingModule { }

export const routedComponents = [
  SightCategoriesViewComponent
];
