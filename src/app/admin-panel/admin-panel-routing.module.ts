import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from '@app/core';
import { LabelsComponent } from './labels/components/labels/labels.component';
import { TasksComponent } from './tasks/components/tasks.component';
import { SuggestionsComponent } from './suggestions/components/suggestions/suggestions.component';
import { SettingsComponent } from './settings/components/settings.component';



const routes: Routes = [
  {
    path: 'admin-panel',
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'suggestions', component: SuggestionsComponent},
      {path: 'labels', component: LabelsComponent},
      {path: 'tasks', component: TasksComponent},
      {path: 'settings', component: SettingsComponent}
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
