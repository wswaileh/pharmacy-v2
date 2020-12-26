import { Component, OnInit } from '@angular/core';
import { DrugEntityService } from 'src/app/_services/facade-services/drug/drug.service';
import { BaseComponent } from 'src/app/_utils/base.component';
import { Drug } from '../../_models/Drug.model';
@Component({
  selector: 'app-drugs',
  templateUrl: './drugs.component.html',
  styleUrls: ['./drugs.component.scss'],
})
export class DrugsComponent extends BaseComponent<Drug> implements OnInit {

  constructor(drugService: DrugEntityService) {
    super(drugService);
  }

  deleteDrug(selectedDrug) {
    this.entityService.delete(selectedDrug).subscribe((data) => {
      console.log(data);
    });
  }

  ngOnInit() {
    super.ngOnInit();
    this.contextMenuItems =
      [
        { label: 'Duplicate', icon: 'far fa-copy', command: () => this.entityActions('Duplicate') },
        ...this.contextMenuItems,
      ];
  }

}
