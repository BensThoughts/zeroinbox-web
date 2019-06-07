import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainHomeComponent } from './main-home/components/main-home/main-home.component';
import { ManualComponent } from './manual/manual.component';
import { ReverseAuthGuardService } from '../core/services/auth/reverse-auth-guard.service';

const routes: Routes = [
/*   {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ReverseAuthGuardService]
  }, */
/*   {
    path: 'home',
    component: MainHomeComponent
  },
  {
    path: 'manual',
    component: ManualComponent
  } */
  
  {
    path: '',
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
      },
      { 
        path: 'home', 
        component: MainHomeComponent,
        canActivate: [ReverseAuthGuardService]
      },
      { 
        path: 'manual', 
        component: ManualComponent
      },
      { 
        path: '**', 
        redirectTo: '/admin-panel/home' 
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
