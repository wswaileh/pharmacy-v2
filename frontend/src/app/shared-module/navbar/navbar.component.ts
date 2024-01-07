import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() public items: MenuItem[];
  @Input() public appVersion: string;
  @Input() public displayName: string;

  @Output() public userMenuSelectionChange: EventEmitter<any>;
  @Output() public homeLinkClicked: EventEmitter<boolean>;

  constructor() {
    this.userMenuSelectionChange = new EventEmitter();
    this.homeLinkClicked = new EventEmitter();
  }

  public onUsernMenuSelect(event): void {
    const data = event.item.data as MenuItem;
    this.userMenuSelectionChange.emit(data);
  }
}
