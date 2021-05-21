import { Component, OnInit } from '@angular/core';
import { DrugEntityService } from '../../_services/facade-services/drug/drug.service';
import { BaseComponent } from '../../_utils/base.component';
import { Drug } from '../../models/drug.model';
import { ButtonsGroupActions } from '../../_utils/constants';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DrugDataService } from '../../_services/data-services/drug/drug.data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BillEntityService } from '../../_services/facade-services/bill/bill.service';
import { NotificationEntityService } from '../../_services/facade-services/notification/notification.service';
import { isDevMode } from '@angular/core';
import { environment } from '@/environments/environment';

@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
})
export class DrugsComponent extends BaseComponent<Drug> implements OnInit {
  drugService: DrugEntityService;
  billService: BillEntityService;

  uniqueBarcodes: number[];

  constructor(
    drugService: DrugEntityService,
    confirmationService: ConfirmationService,
    messageService: MessageService,
    drugDataService: DrugDataService,
    route: ActivatedRoute,
    titleService: Title,
    billService: BillEntityService,
    noticationService: NotificationEntityService
  ) {
    super(drugService, 'Drug', Drug, confirmationService, messageService, drugDataService, route, titleService, noticationService);
    this.drugService = drugService;
    this.billService = billService;
  }

  ngOnInit() {
    super.ngOnInit();
    this.contextMenuItems = [
      {
        label: 'Edit',
        icon: 'fas fa-edit',
        command: () => this.entityActions(ButtonsGroupActions.Edit),
      },
      {
        label: 'Duplicate',
        icon: 'far fa-copy',
        command: () => this.entityActions(ButtonsGroupActions.Duplicate),
      },
      {
        label: 'Remove',
        icon: 'fas fa-trash-alt',
        command: () => this.entityActions(ButtonsGroupActions.Remove),
      },
    ];
  }

  afterEntityDataFetch() {
    if (this.entities && this.entities.length > 0) {
      this.uniqueBarcodes = this.entities.map(e => e.barcode);

      this.route.paramMap.subscribe((params) => {
        this.scrollIntoSection(params.get('barcode'));
        this.selectedEntity = this.entities.find(
          (entity) => entity.barcode === +params.get('barcode')
        );
      });
    }
  }

  entityActions(event){
    if (event === ButtonsGroupActions.Edit){
      this.uniqueBarcodes = this.uniqueBarcodes.filter(e => e !== this.selectedEntity.barcode);
    } else {
      this.uniqueBarcodes = this.entities.map(e => e.barcode);
    }
    super.entityActions(event);
  }

  afterEntityUpdate() {
    this.billService.getAll();
  }

  getEntityDetailsMessage(entity) {
    return entity.name + ' ' + this.entityAction + ' Successfully';
  }

  getEntityDeletionMessage() {
    return (
      'Are you sure that you want to delete \'' + this.selectedEntity.name + '\'?'
    );
  }

  private scrollIntoSection(tag) {
    setTimeout(() => {
      const elmnt = document.getElementById(tag);
      if (elmnt) {
        elmnt.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 20);
  }
}
