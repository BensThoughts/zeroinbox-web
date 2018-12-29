/**
 * [MenuItem] An individual item in the sidenav
 * @property name: the full text name to appear
 * @property link: the router link to go to
 * @property icon: the font awesome icon to display. Make sure the icon
 *  in question is imported into the SharedModule with the other fa-icons.
 */

export interface MenuItem {
  name: string;
  link: string;
  icon: string;
}

export const menu_items: MenuItem[] = [
  {
    name: 'Home',
    link: '/admin-panel/home',
    icon: 'home'
  },
  {
    name: 'Suggestions',
    link: '/admin-panel/suggestions',
    icon: 'lightbulb',
  },
  {
    name: 'Labels',
    link: '/admin-panel/labels',
    icon: 'tag'
  },
  {
    name: 'Filters',
    link: '/admin-panel/filters',
    icon: 'filter'
  },
  {
    name: 'Settings',
    link: '/admin-panel/settings',
    icon: 'cog'
  },
];
