import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionsTableComponent } from './components/subscriptions-table/subscriptions-table.component';
import { UnsubscribeDialogComponent } from './components/unsubscribe-dialog/unsubscribe-dialog.component';
import { SubscriptionsEffects } from './state/subscriptions.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    SubscriptionsComponent,
    SubscriptionsTableComponent,
    UnsubscribeDialogComponent
  ],
  entryComponents: [UnsubscribeDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([SubscriptionsEffects])
  ]
})
export class SubscriptionsModule {}
