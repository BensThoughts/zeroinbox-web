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
    name: 'Stats',
    route: '/admin-panel/labels',
    icon: 'chart-pie'
  },
  {
    name: 'Suggestions',
    route: '/admin-panel/suggestions',
    icon: 'lightbulb',
  },
  {
    name: 'Actions',
    route: '/admin-panel/filters',
    icon: 'tasks'
  },
  {
    name: 'Settings',
    route: '/admin-panel/settings',
    icon: 'cog'
  },
];
