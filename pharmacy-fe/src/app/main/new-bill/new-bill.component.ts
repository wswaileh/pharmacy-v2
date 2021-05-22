import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Bill } from '../../models/bill.model';
import { Drug } from '../../models/drug.model';
import { BillEntityService } from '../../_services/facade-services/bill/bill.service';
import { BaseComponent } from '../../_utils/base.component';
import { DrugEntityService } from '../../_services/facade-services/drug/drug.service';
import { ButtonsGroupActions } from '../../_utils/constants';
import { Title } from '@angular/platform-browser';
import { NotificationEntityService } from '../../_services/facade-services/notification/notification.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.scss'],
})
export class NewBillComponent extends BaseComponent<Bill> implements OnInit {

  drugsService: DrugEntityService;

  drugName: string;
  drugBarcode: number;

  drugNameSearchResults: string[];
  drugBarcodeSearchResults: Drug[];

  discountPercentage = 0;
  discountAmount = 0;

  constructor(
    entityService: BillEntityService,
    drugsService: DrugEntityService,
    confirmationService: ConfirmationService,
    messageService: MessageService,
    titleService: Title,
    noticationService: NotificationEntityService
  ) {
    super(entityService, 'Bill', Bill, confirmationService, messageService, null, null, titleService, noticationService);
    this.drugsService = drugsService;
  }

  ngOnInit(): void {
    this.drugsService.getAllEntities();
    this.entityAction = ButtonsGroupActions.Add;
    this.initNotifications();
  }

  submitEntityModal() {
    this.entityEditorFormModel.pharmacist = {
      id: '5d739b61b4e70f0508aad5ff',
      pid: 8888,
      name: 'Lana'
    };
    this.entityEditorFormModel.time = Math.floor(Date.now() / 1000);
    this.entityService
      .add(this.entityEditorFormModel.toDTO() as any as Bill)
      .subscribe((_) => {
        this.emitSucessToast(this.entityEditorFormModel);
        this.entityEditorFormModel = new Bill();
      });
  }

  getTotal() {
    return this.entityEditorFormModel.calculateTotal();
  }

  searchDrugByName(event) {
    this.drugsService.selectEntitiesByName(event.query).subscribe((drugs) => {
      this.drugNameSearchResults = drugs.map((drug) => drug.name);
    });
  }

  addSelectedDrugFromNameSearchToBill(event) {
    this.drugsService.selectEntityByName(event).subscribe((drug) => {
      this.addDrugToBill(drug);
      this.drugNameSearchResults = [];
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
      if (drug) {
        this.addDrugToBill(drug);
      }
      else {
        this.messageService.add({
          severity: 'error',
          summary: 'Drug Not Found!',
          detail: 'NO Drug with such barcode!',
        });
      }
    });
    this.drugBarcode = undefined;
    this.drugBarcodeSearchResults = [];
  }

  barcodeFieldKeyUp(event) {
    if (event.keyCode === 13 && this.drugBarcode !== null && this.drugBarcode.toString().trim() !== '') {
      this.addSelectedDrugFromBarcodeSearchToBill({ barcode: this.drugBarcode });
    }
  }

  addDrugToBill(drug: Drug) {
    const drugExistingIndex = this.entityEditorFormModel.items.findIndex((item) => item.drug.barcode === drug.barcode);
    if (drugExistingIndex === -1) {
      if (this.selectedEntity instanceof Drug) {
        this.entityEditorFormModel.items.push(drug.toBillItem());
      } else {
        this.entityEditorFormModel.items.push(new Drug().fromDTO(drug).toBillItem());
      }

    } else {
      this.entityEditorFormModel.items[drugExistingIndex].quantity += 1;
    }
  }

  deleteBillItem(barcode) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this row?',
      accept: () => {
        this.entityEditorFormModel.items = this.entityEditorFormModel.items.filter((item) => item.drug.barcode !== barcode);
      }
    });
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.entityEditorFormModel.items && this.entityEditorFormModel.items.length > 0) {

      const result = window.confirm('Bill is NOT saved, Are you sure you want to discard Bill?');
      return of(result);
    }
    return true;
  }
}
