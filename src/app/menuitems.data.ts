/**
 * [MenuItem] An individual item in the sidenav
 * @property name: the full text name to appear
 * @property route: the route to go to
 * @property icon: the font awesome icon to display. Make sure the icon
 *  in question is imported into the SharedModule with the other fa-icons.
 */

export interface MenuItem {
  name: string;
  route: string;
  icon: string;
}

export const auth_menu_items: MenuItem[] = [
  {
    name: 'Home',
    route: '/admin-panel/home',
    icon: 'home'
  },
  {
    name: 'Subscriptions',
    route: '/admin-panel/subscriptions',
    icon: 'newspaper'
  },
  {
    name: 'Senders',
    route: '/admin-panel/suggestions',
    icon: 'lightbulb',
  },
]

export const menu_items: MenuItem[] = [
  {
    name: 'Home',
    route: '/home',
    icon: 'home'
  },
  {
    name: 'Manual',
    route: '/manual',
    icon: 'book'
  },
];
