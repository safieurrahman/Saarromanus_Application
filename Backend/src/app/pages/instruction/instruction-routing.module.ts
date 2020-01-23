import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructionDetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: InstructionDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructionRoutingModule { }

export const routedComponents = [
  InstructionDetailComponent
]
