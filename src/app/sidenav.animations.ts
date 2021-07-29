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

export const sideNavAnimation = trigger('openCloseSidenav', [
  // ...
  state(
    'open',
    style({
      width: '180px'
    })
  ),
  state(
    'closed',
    style({
      width: '63px'
    })
  ),
  transition('open <=> closed', [animate('0.2s')])
]);

/*
 * animation: sideNavContainerAnimation
 * trigger: 'openCloseSidenavContent'
 *
 * comments: Sets the margin-left to 201px when "open" and 61px when "closed".
 */

export const sideNavContentAnimation = trigger('openCloseSidenavContent', [
  state(
    'open',
    style({
      'margin-left': '181px'
      // 'height': '100%'
    })
  ),
  state(
    'closed',
    style({
      'margin-left': '64px'
      // 'height': '100%'
    })
  ),
  transition('open <=> closed', [animate('0.2s')])
]);

/*
 * animation: sideChevronAnimation
 * trigger: 'twirlChevron'
 *
 * comments: rotate(0deg) when "open", rotate(180deg) when "closed".
 */

export const sideNavChevronAnimation = trigger('twirlChevron', [
  state(
    'left',
    style({
      transform: 'rotate(0deg)'
    })
  ),
  state(
    'right',
    style({
      transform: 'rotate(180deg)'
    })
  ),
  transition('left <=> right', [animate('0.2s')])
]);
