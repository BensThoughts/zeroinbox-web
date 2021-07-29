import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingComponent } from './components/loading/loading.component';
import { AuthGuardService } from '../core/services/auth/auth-guard.service';

const routes: Routes = [
  {
    path: 'loading',
    component: LoadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
