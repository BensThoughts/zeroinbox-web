import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

import { AppState } from '@app/core';

import { Store, select } from '@ngrx/store';
import { ISender } from '@app/core/state/senders/model/senders.model';

@Component({
  selector: 'app-message-viewer',
  templateUrl: './message-viewer.component.html',
  styleUrls: ['./message-viewer.component.scss'],
  animations: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageViewerComponent {
  @Input() sender: ISender;

  constructor(private store: Store<AppState>) {}
}
