import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../_services/can-deactivate-guard/can-deactivate-guard.service';
import { AllBillsComponent } from './all-bills/all-bills.component';
import { DrugsComponent } from './drugs/drugs.component';
import { MainComponent } from './main/main.component';
import { ModifyUsersComponent } from './modify-users/modify-users.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { NotificationsComponent } from './notifications/notifications.component';
const routes: any = [
  {
    path: '',
    component: MainComponent,
    text: '',
    children: [
      {
        path: 'drugs',
        component: DrugsComponent
      },
      {
        path: 'drugs/:barcode',
        component: DrugsComponent
      },
      {
        path: 'new-bill',
        component: NewBillComponent,
        canDeactivate: [CanDeactivateGuard]
      },
      {
        path: 'bills',
        component: AllBillsComponent
      },
      {
        path: 'users',
        component: ModifyUsersComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      { path: '**', redirectTo: 'new-bill' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
