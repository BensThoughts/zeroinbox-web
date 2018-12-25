import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabelsComponent } from './store-components/labels/labels.component';

const routes: Routes = [
  {
    path: 'labels',
    component: LabelsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabelsRoutingModule { }
