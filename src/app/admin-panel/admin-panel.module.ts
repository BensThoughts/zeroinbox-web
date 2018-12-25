import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';

import { SharedModule } from '@app/shared';

//import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
//import { LabelsComponent } from './labels/components/labels/labels.component';

//import { GmailLabelService } from '@app/core/services/label/gmail-label.service';
import { UserService } from '@app/core/services/auth-user/user.service';

import { LabelsModule } from './labels/labels.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    LabelsModule,
    AdminPanelRoutingModule
  ],
  providers: [UserService]
})
export class AdminPanelModule { }
