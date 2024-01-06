import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { navbarItems, sidebarItems } from './side-bar-menu-items';
import { version } from '../../../../package.json';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {
    this.sidebarItems = sidebarItems;
    this.navbarItems = navbarItems;
    this.appVersion = version;
  }

  homeLinkClicked(): void {
    this.router.navigate(['/']);
  }

}
