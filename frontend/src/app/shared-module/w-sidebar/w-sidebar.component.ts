import { Component, Input, OnInit } from '@angular/core';

export interface SideBarItem {
  itemName: string;
  routerLink: string;
  icon: string;
  isDisabled?: boolean;
  isWithNotificationCount?: boolean;
  notificationsCount?: string;
}

export interface SideBarItemsGroup {
  itemName: string;
  items: SideBarItem[];
}
@Component({
  // tslint:disable-next-line: component-selector
  selector: 'w-sidebar',
  templateUrl: './w-sidebar.component.html',
  styleUrls: ['./w-sidebar.component.scss']
})
export class WSidebarComponent implements OnInit {

  @Input() items: SideBarItemsGroup[];

  @Input() isOpen: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
