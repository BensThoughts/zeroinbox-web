import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { LoginCompleteAction } from '@app/core/state/auth/auth.actions';
import { LoginSuccessAction } from '../../../core/state/auth/auth.actions';

@Component({
  selector: 'go-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoginCompleteAction());
  }
}
