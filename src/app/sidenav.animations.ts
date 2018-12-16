import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence,
  state
} from '@angular/animations';

export const sideNavAnimation = trigger('openClose', [
    // ...
    state('open', style({
      width: '200px',
    })),
    state('closed', style({
      width: '60px',
    })),
    transition('open => closed', [
      animate('0.5s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
  ]);

export const sideNavContainerAnimation = trigger('closeOpen', [
    // ...
    state('open', style({
      'margin-left': '201px',
  //    transform: 'translateX(0px)',
    })),
    state('closed', style({
      'margin-left': '61px',
    //  transform: 'translateX(-140px)',
    })),
    transition('open => closed', [
      animate('0.5s')
    ]),
    transition('closed => open', [
      animate('0.5s')
    ]),
  ]);
