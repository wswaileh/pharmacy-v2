import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() set items(items: MenuItem[]) {
    this.itemsProcessed = items.map((e) => ({
      ...e,
      command: (data) => this.userMenuSelectionChange.emit(data.item),
    }));
  }
  @Input() public appVersion: string;
  @Input() public displayName: string;

  @Output() public userMenuSelectionChange: EventEmitter<MenuItem>;
  @Output() public homeLinkClicked: EventEmitter<boolean>;

  public itemsProcessed: MenuItem[] = [];

  constructor() {
    this.userMenuSelectionChange = new EventEmitter();
    this.homeLinkClicked = new EventEmitter();
  }

}
