import { Component, OnInit } from '@angular/core';
import { navbarItems, sidebarItems } from './side-bar-menu-items';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sidebarItems;

  navbarItems;

  isSideBarOpen = false;

  constructor() {
    this.sidebarItems = sidebarItems;
    this.navbarItems = navbarItems;
  }

  ngOnInit(): void {
  }

}
