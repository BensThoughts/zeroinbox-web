import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersRoutingModule } from './filters-routing.module';
import { FiltersComponent } from './components/filters.component';

@NgModule({
  declarations: [FiltersComponent],
  imports: [
    CommonModule,
    FiltersRoutingModule
  ]
})
export class FiltersModule { }
