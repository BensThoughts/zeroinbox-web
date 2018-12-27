import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CallbackComponent } from './components/callback/callback.component';
import { LogoutPromptComponent } from './components/logout-prompt/logout-prompt.component';

@NgModule({
  declarations: [LoginPageComponent, CallbackComponent, LogoutPromptComponent],
  entryComponents: [LogoutPromptComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
  ],
  providers: []
})
export class AuthModule { }
