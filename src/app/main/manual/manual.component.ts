import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ManualComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
