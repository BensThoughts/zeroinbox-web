import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '@app/core/services/user.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(private userService: UserService) {

    //this.gapiService.onLoad().subscribe();
  }

  ngOnInit() {
  }

  public signIn() {
    this.userService.signIn();
  }

}
