export interface MenuItem {
  name: string;
  link: string;
  icon: string;
}

export const menu_items: MenuItem[] = [
  {
    name: 'Home',
    link: '/home',
    icon: 'home'
  },
  {
    name: 'Suggestions',
    link: '/suggestions',
    icon: 'lightbulb',
  },
  {
    name: 'Labels',
    link: 'labels',
    icon: 'tag'
  },
  {
    name: 'Filter',
    link: 'filters',
    icon: 'filter'
  },
  {
    name: 'Settings',
    link: 'settings',
    icon: 'cog'
  },
]
