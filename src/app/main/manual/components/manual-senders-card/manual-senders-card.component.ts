import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-manual-senders-card',
  templateUrl: './manual-senders-card.component.html',
  styleUrls: ['./manual-senders-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ManualSendersCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
