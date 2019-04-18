import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { SharedModule } from '@app/shared';


import { StatsModule } from './stats/stats.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { SettingsModule } from './settings/settings.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { HowToComponent } from './how-to/how-to.component';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [HowToComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    SubscriptionsModule,
    SuggestionsModule,
    StatsModule,
    SettingsModule,
    AdminPanelRoutingModule
  ],
  providers: []
})
export class AdminPanelModule { }
