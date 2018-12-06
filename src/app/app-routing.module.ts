import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SettingsModule } from './settings/settings.module';

const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home'}},
  { path: 'home', component: HomeComponent, data: { title: 'Home'}},
  {
    path: 'suggestions',
    loadChildren: './suggestions/suggestions.module#SuggestionsModule',
    data: { title: 'Suggestions'}
  },
  {
    path: 'labels',
    loadChildren: './labels/labels.module#LabelsModule',
    data: { title: 'Labels'}
  },
  {
    path: 'filters',
    loadChildren: './filters/filters.module#FiltersModule',
    data: { title: 'Filters'}
  },
  {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    data: { title: 'Settings'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { useHash: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
