import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainHomeComponent } from './main-home/components/main-home/main-home.component';
import { ManualComponent } from './manual/manual.component';
import { ReverseAuthGuardService } from '../core/services/auth/reverse-auth-guard.service';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
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
        path: 'about',
        component: AboutComponent
      },
      { 
        path: 'manual', 
        component: ManualComponent
      },
      // This redirection re-redirects to /home when not logged in and to
      // /admin-panel/home when logged in
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
