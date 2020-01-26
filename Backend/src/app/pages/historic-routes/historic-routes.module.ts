import { NgModule } from '@angular/core';
import { AgmCoreModule,GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbCardModule, NbAlertModule } from '@nebular/theme';
import { HttpClient, HttpEventType, HttpClientModule } from '@angular/common/http';
import  {Ng2SmartTableModule} from 'ng2-smart-table';
import { HistoricRoutesRoutingModule, routedComponents} from './historic-routes-routing.module';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {
  NbActionsModule,
  NbButtonModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    AgmCoreModule.forRoot({
      apiKey: '',
      libraries: ['places','geometry','drawing'],
    }),
    AgmDirectionModule,     // agm-direction
    LeafletModule.forRoot(),
    HistoricRoutesRoutingModule,
    NgxEchartsModule,
    NbCardModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SmartTableModule,
    HistoricRoutesRoutingModule,
    NbAlertModule,


  ],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
})
export class HistoricRoutesModule { }