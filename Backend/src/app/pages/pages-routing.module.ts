import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'instruction',
      loadChildren: () => import('./instruction/instruction.module')
      .then(m => m.InstructionModule),
    },
    {
      path: 'sights',
      loadChildren: () => import('./sights/sights.module')
        .then(m => m.SightsModule),
    },
    {
      path: 'historic-routes',
      loadChildren: () => import('./historic-routes/historic-routes.module')
        .then(m => m.HistoricRoutesModule),
    },
    {
      path: 'sight-categories',
      loadChildren: () => import('./sight-categories/sight-categories.module')
        .then(m => m.SightCategoriesModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
