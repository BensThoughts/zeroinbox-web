import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionsTableComponent } from './components/subscriptions-table/subscriptions-table.component';

@NgModule({
  declarations: [
    SubscriptionsComponent,
    SubscriptionsTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})

export class SubscriptionsModule { }
