import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsComponent } from './components/suggestions/suggestions.component';
import { SuggestionsTableComponent } from './components/suggestions-table/suggestions-table.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [SuggestionsComponent, SuggestionsTableComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SuggestionsModule { }
