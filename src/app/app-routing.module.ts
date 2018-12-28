import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '@app/core';
import { LoginComponent } from '../../old/old/auth.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: LoginComponent
  },
  {
    path: 'admin-panel',
    loadChildren: './admin-panel/admin-panel.module#AdminPanelModule',
    canActivate: [AuthGuardService]
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
