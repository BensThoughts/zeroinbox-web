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

export const menu_items: MenuItem[] = [
  {
    name: 'Home',
    route: '/admin-panel/home',
    icon: 'home'
  },
  {
    name: 'How-To',
    route: '/admin-panel/how-to',
    icon: 'book-dead'
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
  {
    name: 'Actions',
    route: '/admin-panel/tasks',
    icon: 'tasks'
  },
];
