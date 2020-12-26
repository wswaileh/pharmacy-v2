import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BillItem } from 'src/app/_models/Bill-item.model';
import { Bill } from 'src/app/_models/Bill.model';
import { Drug, toBillItem } from 'src/app/_models/Drug.model';
import { BillEntityService } from 'src/app/_services/facade-services/bill/bill.service';
import { BaseComponent } from 'src/app/_utils/base.component';
import { DrugEntityService } from '../../_services/facade-services/drug/drug.service';
@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss']
})
export class NewBillComponent extends BaseComponent<Bill> implements OnInit {

  drugsService: DrugEntityService;

  billItems: BillItem[] = [];

  drugName: string;
  drugBarcode: number;

  drugNameSearchResults: string[];
  drugBarcodeSearchResults: Drug[];

  discountPercentage = 0;
  discountAmount = 0;

  constructor(entityService: BillEntityService, drugsService: DrugEntityService, private confirmationService: ConfirmationService) {
    super(entityService);
    this.drugsService = drugsService;
  }

  ngOnInit(): void {
    this.drugsService.getAllEntities();
  }

  getTotal() {
    let total = 0;
    this.billItems.forEach(product => {
      total += (+product.price * +product.quantity);
    });
    if (this.discountPercentage !== 0) {
      total = total * (1 - (this.discountPercentage / 100));
    }
    if (this.discountAmount !== 0) {
      total -= this.discountAmount;
    }
    return total;
  }

  searchDrugByName(event) {
    this.drugsService.selectEntitiesByName(event.query).subscribe((drugs) => {
      this.drugNameSearchResults = drugs.map((drug) => drug.name);
    });
  }

  addSelectedDrugFromNameSearchToBill(event) {
    this.drugsService.selectEntityByName(event).subscribe((drug) => {
      this.addDrugToBill(drug);
    });
    this.drugName = undefined;
  }

  searchDrugByBarcode(event) {
    this.drugsService.selectEntitiesByBarcode(event.query).subscribe((drug) => {
      this.drugBarcodeSearchResults = drug;
    });
  }

  addSelectedDrugFromBarcodeSearchToBill(event) {
    this.drugsService.selectEntityByBarcode(+event.barcode).subscribe((drug) => {
      this.addDrugToBill(drug);
    });
    this.drugBarcode = undefined;
    this.drugBarcodeSearchResults = [];
  }

  barcodeFieldKeyUp(event) {
    if (event.keyCode === 13) {
      this.addSelectedDrugFromBarcodeSearchToBill({ barcode: this.drugBarcode });
    }
  }

  addDrugToBill(drug: Drug) {
    const drugExistingIndex = this.billItems.findIndex((item) => item.barcode === drug.barcode);
    if (drugExistingIndex === -1) {
      this.billItems.push(toBillItem(drug));
    } else {
      this.billItems[drugExistingIndex].quantity += 1;
    }
  }

  deleteBillItem(barcode) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this row?',
      accept: () => {
        this.billItems = this.billItems.filter((item) => item.barcode !== barcode);
      }
    });
  }
}
