import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';

import { SharedModule } from '@app/shared';

import { MainHomeModule } from './main-home/main-home.module';
import { ContactComponent } from './contact/contact.component';
import { ManualModule } from './manual/manual.module';
import { SettingsModule } from './settings/settings.module';
import { MicroServicesComponent } from './story/components/micro-services/micro-services.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainHomeModule,
    MainRoutingModule,
    ManualModule,
    SettingsModule
  ],
  providers: []
})
export class MainModule {}
