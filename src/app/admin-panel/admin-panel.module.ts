import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { SharedModule } from '@app/shared';

import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LabelsComponent } from './labels/components/labels.component';

import { GmailLabelService } from '@app/core/services/gmail-label.service';
import { UserService } from '@app/core/services/user.service';

@NgModule({
  declarations: [NavigationComponent, HomeComponent, LabelsComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminPanelRoutingModule
  ],
  providers: [GmailLabelService, UserService]
})
export class AdminPanelModule { }
