import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { SubscriptionsComponent } from './components/subscriptions.component';

@NgModule({
  declarations: [SubscriptionsComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]
})

export class SubscriptionsModule { }
