import { Component } from '@angular/core';
import { navbarItems, sidebarItems } from './side-bar-menu-items';
import { Router } from '@angular/router';
import pkg from '../../../../package.json';
import { MenuItem } from 'primeng/api';
import {
  AuthService,
  CurrentUserType,
} from '../../_services/facade-services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  sidebarItems;

  navbarItems;

  isSideBarOpen = false;

  appVersion: string;

  currentUser: CurrentUserType = null;

  constructor(public authService: AuthService, private router: Router) {
    this.sidebarItems = sidebarItems;
    this.navbarItems = navbarItems;
    this.appVersion = pkg.version;
  }

  ngOnInit() {
    this.authService
      .getCurrentUser$()
      .subscribe((currentUser) => (this.currentUser = currentUser));
  }

  homeLinkClicked(): void {
    this.router.navigate(['/']);
  }

  userClickedMenuOption(selectedItem: MenuItem) {
    if (selectedItem.label === 'Logout') {
      this.authService.logout();
      window.location.reload();
    }
  }
}
