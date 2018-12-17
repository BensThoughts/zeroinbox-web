import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@app/core/services/auth-user/user.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() { }

  // used to sign a google user in
  //  signOut() in implemented in app.component.ts
  public signIn() {
    this.userService.signIn();
  }

}
