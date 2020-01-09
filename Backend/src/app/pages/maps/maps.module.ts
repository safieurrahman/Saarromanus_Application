import { NgModule } from '@angular/core';
import { AgmCoreModule,GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgxEchartsModule } from 'ngx-echarts';
import { NbCardModule } from '@nebular/theme';
import { HttpClient, HttpEventType, HttpClientModule } from '@angular/common/http';

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
import { MapsRoutingModule, routedComponents } from './maps-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAGnNX97TtPX9IJrrB7bEo1bJANBgaOtN4',
      libraries: ['places','geometry','drawing'],
    }),
    AgmDirectionModule,     // agm-direction
    LeafletModule.forRoot(),
    MapsRoutingModule,
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
    HttpClientModule,


  ],
  exports: [],
  declarations: [
    ...routedComponents,
  ],
})
export class MapsModule { }