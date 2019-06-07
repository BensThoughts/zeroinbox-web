import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { SharedModule } from '@app/shared';


import { SuggestionsModule } from './suggestions/suggestions.module';
import { SettingsModule } from './settings/settings.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { HomeModule } from './home/home.module';
import { LogoutPromptComponent } from './logout-prompt/logout-prompt.component';

@NgModule({
  declarations: [LogoutPromptComponent],
  entryComponents: [LogoutPromptComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    SubscriptionsModule,
    SuggestionsModule,
    SettingsModule,
    AdminPanelRoutingModule
  ],
  providers: []
})
export class AdminPanelModule { }
