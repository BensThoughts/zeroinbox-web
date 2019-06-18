import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { SharedModule } from '@app/shared';


import { SendersModule } from './senders/senders.module';
import { SettingsModule } from './settings/settings.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { HomeModule } from './home/home.module';
import { DownloadingComponent } from './downloading/downloading.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../core/core.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [DownloadingComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    SubscriptionsModule,
    SendersModule,
    SettingsModule,
    AdminPanelRoutingModule,
/*     TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }) */
  ],
  providers: []
})
export class AdminPanelModule { }
