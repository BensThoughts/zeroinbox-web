import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReverseAuthGuardService } from './core/services/auth-user/reverse-auth-guard.service';
// import { AuthGuardService } from '@app/core';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  /**
   * If user is not authenticated in the auth guard on /admin-panel will
   * redirect to /login. If they are auth we will go to /admin-panel/home
   */
  {
    path: '**',
    redirectTo: '/admin-panel/home'
  },
  {
    path: 'admin-panel',
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule',
    // canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: false }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
