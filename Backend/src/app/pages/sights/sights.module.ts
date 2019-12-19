import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { SightsRoutingModule, routedComponents } from './sights-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    SightsRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class SightsModule { }
