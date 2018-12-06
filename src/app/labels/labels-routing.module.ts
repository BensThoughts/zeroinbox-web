import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelsComponent } from './components/labels.component';

const routes: Routes = [
  {
    path: '',
    component: LabelsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelsRoutingModule { }
