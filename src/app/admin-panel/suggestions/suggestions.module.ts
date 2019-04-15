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


@NgModule({
  declarations: [SuggestionsComponent, SuggestionsCountTableComponent, SuggestionsSizeTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('suggestions', suggestionsReducer),
    EffectsModule.forFeature([SuggestionsEffects])
  ]
})
export class SuggestionsModule { }
