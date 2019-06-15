import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { SuggestionsCountTableComponent } from './components/suggestions-count-table/suggestions-count-table.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { suggestionsReducer } from './state/suggestions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SuggestionsEffects } from './state/suggestions.effects';
import { SuggestionsSizeTableComponent } from './components/suggestions-size-table/suggestions-size-table.component';
import { LabelDialogComponent } from './components/label-dialog/label-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { DeleteAllDialogComponent } from './components/delete-all-dialog/delete-all-dialog.component';
import { LabelAllDialogComponent } from './components/label-all-dialog/label-all-dialog.component';


@NgModule({
  declarations: [
    SuggestionsComponent, 
    SuggestionsCountTableComponent, 
    SuggestionsSizeTableComponent,
    LabelDialogComponent,
    LabelAllDialogComponent,
    DeleteDialogComponent,
    DeleteAllDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('suggestions', suggestionsReducer),
    EffectsModule.forFeature([SuggestionsEffects])
  ],
  entryComponents: [
    LabelDialogComponent,
    LabelAllDialogComponent,
    DeleteDialogComponent,
    DeleteAllDialogComponent
  ]
})
export class SuggestionsModule { }
