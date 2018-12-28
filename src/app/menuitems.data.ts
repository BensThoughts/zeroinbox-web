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
]
