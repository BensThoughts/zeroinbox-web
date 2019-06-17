import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import {
  AppState,
} from '@app/core';

import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.scss'],
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MessageViewerComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
