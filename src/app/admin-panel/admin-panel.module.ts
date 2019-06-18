import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';


import { SendersModule } from './senders/senders.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { HomeModule } from './home/home.module';
import { DownloadingComponent } from './downloading/components/downloading/downloading.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../core/core.module';
import { HttpClient } from '@angular/common/http';
import { DownloadingModule } from './downloading/downloading.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DownloadingModule,
    HomeModule,
    SubscriptionsModule,
    SendersModule,
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
