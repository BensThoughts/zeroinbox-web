import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingComponent } from './components/loading/loading.component';
import { DownloadingComponent } from './components/downloading/downloading.component';


const routes: Routes = [
  {
    path: 'loading',
    component: LoadingComponent
  },
  {
    path: 'downloading',
    component: DownloadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
