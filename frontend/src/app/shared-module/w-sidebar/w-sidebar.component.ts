import { Component, Input } from '@angular/core';

export interface SideBarItem {
  itemName: string;
  routerLink: string;
  icon: string;
  isDisabled?: boolean;
  isWithNotificationCount?: boolean;
  notificationsCount?: string;
  allowedRoles: string[];
}

export interface SideBarItemsGroup {
  itemName: string;
  items: SideBarItem[];
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'w-sidebar',
  templateUrl: './w-sidebar.component.html',
  styleUrls: ['./w-sidebar.component.scss'],
})
export class WSidebarComponent {
  @Input() set items(groups: SideBarItemsGroup[]) {
    this.itemsFiltered = groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.allowedRoles.includes(this.currentUserRole)
        ),
      }))
      .filter((group) => group.items.length);
  }

  @Input() isOpen: boolean;

  @Input() currentUserRole: string;

  itemsFiltered: SideBarItemsGroup[] = [];

  constructor() {}
}
