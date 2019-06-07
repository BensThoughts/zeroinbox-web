import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/components/home/home.component';
import { AuthGuardService } from '@app/core';
import { SuggestionsComponent } from './suggestions/components/suggestions/suggestions.component';
import { SettingsComponent } from './settings/components/settings.component';
import { SubscriptionsComponent } from './subscriptions/components/subscriptions/subscriptions.component';



const routes: Routes = [
  {
    path: 'admin-panel',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'suggestions', component: SuggestionsComponent },
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
