import { Component, OnInit } from '@angular/core';
import { BillEntityService } from 'src/app/_services/facade-services/bill/bill.service';
import { Bill } from '../../_models/Bill.model';
import { BaseComponent } from '../../_utils/base.component';
@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.component.html',
  styleUrls: ['./all-bills.component.scss']
})
export class AllBillsComponent extends BaseComponent<Bill> implements OnInit {

  constructor(billService: BillEntityService) {
    super(billService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

}
