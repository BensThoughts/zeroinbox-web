import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OauthComponent } from './oauth.component';

const routes: Routes = [
  {
    path: '',
    component: OauthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OauthRoutingModule { }
