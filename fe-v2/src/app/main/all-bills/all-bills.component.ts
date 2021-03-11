import { Component, OnInit } from '@angular/core';
import { BillEntityService } from '../../_services/facade-services/bill/bill.service';
import { Bill } from '../../_models/bill.model';
import { BaseComponent } from '../../_utils/base.component';
import { ButtonsGroupActions } from '../../_utils/constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NotificationEntityService } from '../../_services/facade-services/notification/notification.service';
@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.component.html',
  styleUrls: ['./all-bills.component.scss'],
  providers: [ConfirmationService]
})
export class AllBillsComponent extends BaseComponent<Bill> implements OnInit {
  router: Router;

  constructor(
    billService: BillEntityService,
    confirmationService: ConfirmationService,
    router: Router,
    messageService: MessageService,
    titleService: Title,
    noticationService: NotificationEntityService
  ) {
    super(billService, '', Bill, confirmationService, messageService, null, null, titleService, noticationService);
    this.router = router;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  entityActions(action) {
    if (action === ButtonsGroupActions.Add) {
      // Navigate to new bill page
      this.router.navigate(['new-bill']);
    } else {
      super.entityActions(action);
    }
  }
}
