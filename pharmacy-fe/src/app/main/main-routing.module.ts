import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllBillsComponent } from './all-bills/all-bills.component';
import { DrugsComponent } from './drugs/drugs.component';
import { MainComponent } from './main/main.component';
import { ModifyUsersComponent } from './modify-users/modify-users.component';
import { NewBillComponent } from './new-bill/new-bill.component';
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
        path: 'new-bill',
        component: NewBillComponent
      },
      {
        path: 'bills',
        component: AllBillsComponent
      },
      {
        path: 'users',
        component: ModifyUsersComponent
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
