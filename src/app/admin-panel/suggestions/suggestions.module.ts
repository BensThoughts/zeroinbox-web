import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { SuggestionsTableComponent } from './components/suggestions-table/suggestions-table.component';
import { SharedModule } from '@app/shared';
import { StoreModule } from '@ngrx/store';
import { suggestionsReducer } from './state/suggestions.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SuggestionsEffects } from './state/suggestions.effects';
import { SuggestionsBySizeComponent } from './components/suggestions-by-size/suggestions-by-size.component';


@NgModule({
  declarations: [SuggestionsComponent, SuggestionsTableComponent, SuggestionsBySizeComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('suggestions', suggestionsReducer),
    EffectsModule.forFeature([SuggestionsEffects])
  ]
})
export class SuggestionsModule { }
