import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SightCategoriesComponent } from './sight-categories.component';
import { SightCategoriesViewComponent } from './view/view.component';
import { SightCategoriesDetailComponent } from './detail/detail.component';

const routes: Routes = [{
  path: '',
  component: SightCategoriesComponent,
  children: [
    {
      path: 'create',
      component: SightCategoriesDetailComponent,
    },
    {
      path: 'view',
      component: SightCategoriesViewComponent,
    },
    {
      path: 'detail/:id',
      component: SightCategoriesDetailComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SightCategoriesRoutingModule { }

export const routedComponents = [
  SightCategoriesComponent,
  SightCategoriesViewComponent,
  SightCategoriesDetailComponent
];
