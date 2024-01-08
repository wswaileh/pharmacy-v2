import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AllBillsComponent } from './all-bills/all-bills.component';
import { DrugsComponent } from './drugs/drugs.component';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { ModifyUsersComponent } from './modify-users/modify-users.component';
import { NewBillComponent } from './new-bill/new-bill.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared-module/shared.module';
import { BillEntityService } from '../_services/facade-services/bill/bill.service';
import { DrugEntityService } from '../_services/facade-services/drug/drug.service';
import { NotificationEntityService } from '../_services/facade-services/notification/notification.service';

@NgModule({
  declarations: [
    DrugsComponent,
    NewBillComponent,
    MainComponent,
    AllBillsComponent,
    ModifyUsersComponent,
    NotificationsComponent,
  ],
  imports: [CommonModule, MainRoutingModule, FormsModule, SharedModule],
  providers: [DrugEntityService, BillEntityService, NotificationEntityService],
})
export class MainModule {}
