import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendersComponent } from './components/senders/senders.component';
import { SendersCountTableComponent } from './components/senders-count-table/senders-count-table.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { suggestionsReducer } from './state/senders-view.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SendersViewEffects } from './state/senders-view.effects';
import { SendersSizeTableComponent } from './components/senders-size-table/senders-size-table.component';
import { LabelDialogComponent } from './components/label-dialog/label-dialog.component';
import { TrashDialogComponent } from './components/trash-dialog/trash-dialog.component';
import { TrashAllDialogComponent } from './components/trash-all-dialog/trash-all-dialog.component';
import { LabelAllDialogComponent } from './components/label-all-dialog/label-all-dialog.component';
import { SharedComponentModule } from '../shared-components/shared-components.module';

@NgModule({
  declarations: [
    SendersComponent,
    SendersCountTableComponent,
    SendersSizeTableComponent,
    LabelDialogComponent,
    LabelAllDialogComponent,
    TrashDialogComponent,
    TrashAllDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedComponentModule,
    StoreModule.forFeature('senders-view', suggestionsReducer),
    EffectsModule.forFeature([SendersViewEffects])
  ],
  entryComponents: [
    LabelDialogComponent,
    LabelAllDialogComponent,
    TrashDialogComponent,
    TrashAllDialogComponent
  ]
})
export class SendersModule {}
