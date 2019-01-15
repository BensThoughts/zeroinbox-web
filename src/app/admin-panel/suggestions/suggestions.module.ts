import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuggestionsComponent } from './components/suggestions.component';
import { SharedModule } from '@app/shared';

@NgModule({
  declarations: [SuggestionsComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SuggestionsModule { }
