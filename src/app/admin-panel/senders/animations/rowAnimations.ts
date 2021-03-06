import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

/*
 * animation: sideNaveAnimation
 * trigger: 'openClose'
 *
 * comments: sets the width to of an element to 200px when 'open' and to 60px
 *   when closed.  Animates in between these two states over '0.3s'
 */

export const rowAnimations = trigger('removeRow', [
  /**
  transition(':enter', [
    style({ transform: 'translateY(10%)', opacity: '0' }),
    animate('.2s ease-in', style({ transform: 'translateY(0%)', opacity: '1'})),
  ])**/
  state('add', style({ opacity: '1' })),
  state('remove', style({ opacity: '0' })),
  transition('add <=> remove', [animate('0.2s')])
]);
