import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Bill } from '../../../_models/Bill.model';
import { BaseEntityService } from '../base-entity.service';


@Injectable()
export class BillEntityService extends BaseEntityService<Bill>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Bill', serviceElementsFactory);
  }

}
