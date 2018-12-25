import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';

//import { LabelsComponent } from './labels/components/labels/labels.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'labels',
    loadChildren: './labels/labels.module#LabelsModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
