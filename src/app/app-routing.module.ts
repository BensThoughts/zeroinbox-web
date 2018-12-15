import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { LoginComponent } from '@app/login/components/login.component';
import { AuthModule } from './auth/auth.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
//  {
//    path: 'admin-panel',
//    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule'
//  }
/*  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
