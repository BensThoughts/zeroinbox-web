import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core/state/core.state';

import { Observable } from 'rxjs';
import { selectSendersLoaded } from '../../../../core/state/senders/senders.selectors';
import { SendersRequestAction } from '@app/core/state/senders/senders.actions';



@Component({
  selector: 'app-senders',
  templateUrl: './senders.component.html',
  styleUrls: ['./senders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendersComponent implements OnInit {

  sendersLoaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
      this.sendersLoaded$ = this.store.pipe(select(selectSendersLoaded));
      this.store.dispatch(new SendersRequestAction());
  }

}
