import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelsComponent } from './components/labels/labels.component';
import { LabelsListComponent } from './components/labels-list/labels-list.component';
import { LabelsInputComponent } from './components/labels-input/labels-input.component';

import { SharedModule } from '@app/shared';
// import { DropListComponent } from './components/drop-list/drop-list.component';


import { StoreModule } from '@ngrx/store';
import { gmailLabelReducer } from './state/gmail-label/gmail-label.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GmailLabelEffects } from './state/gmail-label/gmail-label.effects';

import { GmailLabelService } from './services/gmail-label/gmail-label.service';

@NgModule({
  declarations: [LabelsComponent, LabelsListComponent, LabelsInputComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('gmail-labels', gmailLabelReducer),
    EffectsModule.forFeature([GmailLabelEffects]),
  ],
  providers: [GmailLabelService]
})
export class LabelsModule { }
