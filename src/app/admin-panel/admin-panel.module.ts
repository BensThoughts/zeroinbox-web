import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { SharedModule } from '@app/shared';


import { SuggestionsModule } from './suggestions/suggestions.module';
import { SettingsModule } from './settings/settings.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';
import { HomeModule } from './home/home.module';
import { LogoutPromptComponent } from './logout-prompt/logout-prompt.component';
import { DownloadingComponent } from './downloading/downloading.component';
import { MessageViewerModule } from './message-viewer/message-viewer.module';

@NgModule({
  declarations: [LogoutPromptComponent, DownloadingComponent],
  entryComponents: [LogoutPromptComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeModule,
    SubscriptionsModule,
    SuggestionsModule,
    SettingsModule,
    AdminPanelRoutingModule,
    MessageViewerModule
  ],
  providers: []
})
export class AdminPanelModule { }
