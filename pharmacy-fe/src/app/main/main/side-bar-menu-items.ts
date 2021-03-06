import { SideBarItemsGroup } from '../../shared-module/w-sidebar/w-sidebar.component';

export const sidebarItems: SideBarItemsGroup[] = [
  {
    itemName: '',
    items: [
      {
        itemName: 'Expiries',
        routerLink: '/main/notifications',
        icon: 'fas fa-bell',
        isWithNotificationCount: true
      }
    ]
  },
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
    items: [      {
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
