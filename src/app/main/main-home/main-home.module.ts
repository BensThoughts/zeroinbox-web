import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainHomeComponent } from './components/main-home/main-home.component';

import { SharedModule } from '@app/shared';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [MainHomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  providers: []
})
export class MainHomeModule { }