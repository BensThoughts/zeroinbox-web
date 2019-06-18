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
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { DeleteAllDialogComponent } from './components/delete-all-dialog/delete-all-dialog.component';
import { LabelAllDialogComponent } from './components/label-all-dialog/label-all-dialog.component';
import { MessageViewerComponent } from './components/message-viewer/message-viewer.component';


@NgModule({
  declarations: [
    SendersComponent, 
    SendersCountTableComponent, 
    SendersSizeTableComponent,
    LabelDialogComponent,
    LabelAllDialogComponent,
    DeleteDialogComponent,
    DeleteAllDialogComponent,
    MessageViewerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('senders-view', suggestionsReducer),
    EffectsModule.forFeature([SendersViewEffects])
  ],
  entryComponents: [
    LabelDialogComponent,
    LabelAllDialogComponent,
    DeleteDialogComponent,
    DeleteAllDialogComponent
  ]
})
export class SendersModule { }