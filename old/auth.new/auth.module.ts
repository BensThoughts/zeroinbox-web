import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '@app/shared';


import { LoginPageComponent } from './components/login-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LogoutPromptComponent } from './components/logout-prompt/logout-prompt.component';

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent, CallbackComponent, LogoutPromptComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
