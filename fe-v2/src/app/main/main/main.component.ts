import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { navbarItems, sidebarItems } from './side-bar-menu-items';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  sidebarItems;

  navbarItems;

  isSideBarOpen = false;

  constructor(private store: Store) {
    this.sidebarItems = sidebarItems;
    this.navbarItems = navbarItems;
  }

}
