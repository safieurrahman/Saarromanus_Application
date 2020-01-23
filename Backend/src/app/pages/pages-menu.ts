import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Sight Categories',
    icon: 'pricetags-outline',
    children: [
      {
        title: 'Create',
        link: '/pages/sight-categories/create',
      },
      {
        title: 'View',
        link: '/pages/sight-categories/view',
      },
      
    ],
  },
  {
    title: 'Sights',
    icon: 'umbrella-outline',
    children: [
      {
        title: 'Create',
        link: '/pages/sights/create',
      },
      {
        title: 'View',
        link: '/pages/sights/view',
      },
    ],
  },
  {
    title: 'Routes',
    icon: 'pin-outline',
    children: [
      {
        title: 'Create',
        link: '/pages/historic-routes/create',
      },
      {
        title: 'View',
        link: '/pages/historic-routes/view',
      },
    ],
  },
  {
    title: 'Instruction Manual',
    icon: 'file-text-outline',
    link: '/pages/instruction',
  }
];
