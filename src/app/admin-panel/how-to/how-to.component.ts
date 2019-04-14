import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './how-to.component.html',
  styleUrls: ['./how-to.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HowToComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

}
