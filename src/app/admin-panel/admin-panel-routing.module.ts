import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/components/home/home.component';
import { AuthGuardService } from '@app/core';
import { SendersComponent } from './senders/components/senders/senders.component';
import { SettingsComponent } from './settings/components/settings.component';
import { SubscriptionsComponent } from './subscriptions/components/subscriptions/subscriptions.component';
import { DownloadingComponent } from './downloading/components/downloading/downloading.component';



const routes: Routes = [
  {
    path: 'admin-panel',
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
      },
      { 
        path: 'home', 
        component: HomeComponent,
        // canActivate: [AuthGuardService]
      },
      { 
        path: 'subscriptions', 
        component: SubscriptionsComponent,
        // canActivate: [AuthGuardService] 
      },
      { 
        path: 'senders', 
        component: SendersComponent,
        // canActivate: [AuthGuardService] 
      },
      {
        path: 'downloading',
        component: DownloadingComponent,
      }
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
