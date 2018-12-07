import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Feature, features } from './features.data';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: Feature[] = features;

  constructor() { }

  ngOnInit() {
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }
}
