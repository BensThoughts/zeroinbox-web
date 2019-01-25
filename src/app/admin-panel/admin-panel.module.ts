import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { SharedModule } from '@app/shared';

// import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
// import { LabelsComponent } from './labels/components/labels/labels.component';

// import { GmailLabelService } from '@app/core/services/label/gmail-label.service';


import { StatsModule } from './stats/stats.module';
import { SuggestionsModule } from './suggestions/suggestions.module';
import { TasksModule } from './tasks/tasks.module';
import { SettingsModule } from './settings/settings.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    SuggestionsModule,
    StatsModule,
    TasksModule,
    SettingsModule,
    AdminPanelRoutingModule
  ],
  providers: []
})
export class AdminPanelModule { }
