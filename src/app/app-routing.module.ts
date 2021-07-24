import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuardService } from '@app/core';

const routes: Routes = [
/*   {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, */
  /**
   * If user is not authenticated in the auth guard on /admin-panel will
   * redirect to /login. If they are auth we will go to /admin-panel/home
   */
/*   {
    path: '**',
    redirectTo: '/admin-panel/home'
  }, */
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: 'admin-panel',
    loadChildren: () => import('./admin-panel/admin-panel.module').then(m => m.AdminPanelModule),
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
