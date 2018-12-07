import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltersComponent } from './components/filters.component';

const routes: Routes = [
  {
    path: '',
    component: FiltersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltersRoutingModule { }
