import {
  animate,
  query,
  style,
  transition,
  trigger,
  stagger,
  sequence
} from '@angular/animations';

export const fadeElementsAnimation = trigger('listAnimation', [
  transition(':enter',[
    style({ transform: 'translateY(10%)', opacity: '0' }),
    animate('.5s ease-in', style({ transform: 'translateY(0%)', opacity: '1'})),
  ])
]);
