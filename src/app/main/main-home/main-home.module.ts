import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainHomeComponent } from './components/main-home/main-home.component';

import { SharedModule } from '@app/shared';

import { RouterModule } from '@angular/router';
import { LoginCardComponent } from '@app/auth/components/login-card/login-card.component';


@NgModule({
  declarations: [MainHomeComponent, LoginCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  providers: []
})
export class MainHomeModule { }