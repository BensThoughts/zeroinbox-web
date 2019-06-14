import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { RouterModule } from '@angular/router';
import { ManualComponent } from './components/manual/manual.component';
import { ManualLoginCardComponent } from './components/manual-login-card/manual-login-card.component';
import { ManualUnsubscribeCardComponent } from './components/manual-unsubscribe-card/manual-unsubscribe-card.component';
import { ManualSendersCardComponent } from './components/manual-senders-card/manual-senders-card.component';
import { ManualDownloadingCardComponent } from './components/manual-downloading-card/manual-downloading-card.component';
import { ManualStatsCardComponent } from './components/manual-stats-card/manual-stats-card.component';


@NgModule({
  declarations: [
    ManualComponent,
    ManualLoginCardComponent, 
    ManualUnsubscribeCardComponent, 
    ManualSendersCardComponent,
    ManualDownloadingCardComponent,
    ManualStatsCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  providers: []
})
export class ManualModule { }