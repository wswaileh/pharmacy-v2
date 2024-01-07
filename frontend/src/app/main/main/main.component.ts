import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { navbarItems, sidebarItems } from './side-bar-menu-items';
import pkg from '../../../../package.json';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  sidebarItems;

  navbarItems;

  isSideBarOpen = false;

  appVersion: string;

  constructor(private store: Store) {
    this.sidebarItems = sidebarItems;
    this.navbarItems = navbarItems;
    this.appVersion = pkg.version;
  }

}
