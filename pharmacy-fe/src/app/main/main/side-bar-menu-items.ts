import { SideBarItemsGroup } from '../../shared-module/w-sidebar/w-sidebar.component';

export const sidebarItems: SideBarItemsGroup[] = [
  {
    itemName: 'Drugs',
    items: [
      {
        itemName: 'Drugs',
        routerLink: '/main/drugs',
        icon: 'fas fa-tablets'
      }
    ]
  },
  {
    itemName: 'Bills',
    items: [
      // TODO: Create new bath for all bills page
      {
        itemName: 'New Bill',
        routerLink: '/main/new-bill',
        icon: 'fas fa-plus-square'
      },
      {
        itemName: 'All Bills',
        routerLink: '/main/bills',
        icon: 'fas fa-file-invoice-dollar'
      },
    ]
  },
  {
    itemName: 'Reports',
    items: [
      // TODO: Create new bath for all bills page
      {
        itemName: 'Reports',
        routerLink: '/sfaf',
        icon: 'fas fa-clipboard-list',
        isDisabled: true
      },
    ]
  },
  {
    itemName: 'Administration',
    items: [
      // TODO: Create new bath for all bills page
      {
        itemName: 'Edit Users',
        routerLink: '/main/users',
        icon: 'fas fa-users',
        isDisabled: true
      },
    ]
  },
];

export const navbarItems = [
  {
    label: 'Logout',
    icon: 'pi pi-fw pi-power-off'
  }
];
