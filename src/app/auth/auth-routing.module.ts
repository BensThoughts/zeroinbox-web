import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ReverseAuthGuardService } from '@app/core/services/auth-user/reverse-auth-guard.service';


const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ReverseAuthGuardService]
  },
  {
    path: 'loading',
    component: LoadingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
