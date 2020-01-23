import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SightsModule } from './sights/sights.module';
import { HistoricRoutesModule } from './historic-routes/historic-routes.module';
import { SightCategoriesModule } from './sight-categories/sight-categories.module';
import { InstructionModule } from './instruction/instruction.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    MiscellaneousModule,
    SightCategoriesModule,
    SightsModule,
    HistoricRoutesModule,
    InstructionModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
