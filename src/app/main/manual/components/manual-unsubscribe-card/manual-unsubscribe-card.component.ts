import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-manual-unsubscribe-card',
  templateUrl: './manual-unsubscribe-card.component.html',
  styleUrls: ['./manual-unsubscribe-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManualUnsubscribeCardComponent {
  constructor() {}
}
