import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/components/home/home.component';
import { AuthGuardService } from '@app/core';
import { StatsComponent } from './stats/components/stats/stats.component';
import { TasksComponent } from './tasks/components/tasks.component';
import { SuggestionsComponent } from './suggestions/components/suggestions/suggestions.component';
import { SettingsComponent } from './settings/components/settings.component';
import { SubscriptionsComponent } from './subscriptions/components/subscriptions.component';
import { HowToComponent } from './how-to/how-to.component';



const routes: Routes = [
  {
    path: 'admin-panel',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'how-to', component: HowToComponent},
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'suggestions', component: SuggestionsComponent },
      // { path: 'stats', component: StatsComponent },
      { path: 'actions', component: TasksComponent },
      // { path: 'settings', component: SettingsComponent }
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
