import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { MatSort, MatPaginator, PageEvent, Sort } from '@angular/material';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { fromMatPaginator, paginateRows, fromMatSort, sortRows } from '../../../../core/utils/datasource-utils';
import { ISender } from '@app/core/state/senders/model/senders.model';

@Component({
  selector: 'app-subscriptions-component',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
  }


}