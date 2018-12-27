import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
//  {
//    path: 'scope',
//    redirectTo: '/home'
//  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: false }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
