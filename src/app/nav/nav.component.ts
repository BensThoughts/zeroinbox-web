import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@app/shared';

import { fadeAnimation } from './fade-animations';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: [fadeAnimation]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
