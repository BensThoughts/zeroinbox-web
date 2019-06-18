import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainHomeComponent } from './main-home/components/main-home/main-home.component';
import { ManualComponent } from './manual/components/manual/manual.component';
import { ReverseAuthGuardService } from '../core/services/auth/reverse-auth-guard.service';
import { StoryComponent } from './story/story.component';
import { ContactComponent } from './contact/contact.component';
import { SettingsComponent } from './settings/components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { 
        path: '', 
        redirectTo: 'home', 
        pathMatch: 'full' 
      },
      { 
        path: 'home', 
        component: MainHomeComponent,
        canActivate: [ReverseAuthGuardService]
      },
      { 
        path: 'manual', 
        component: ManualComponent
      },
      {
        path: 'story',
        component: StoryComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      // This redirection re-redirects to /home when not logged in and to
      // /admin-panel/home when logged in
      { 
        path: '**', 
        redirectTo: '/admin-panel/home' 
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
