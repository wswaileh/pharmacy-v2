import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';

import { Bill } from '../../../_models/bill.model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class BillDataService extends BaseDataService<Bill> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, defaultDataServiceConfig: DefaultDataServiceConfig) {
    super('Bill', http, httpUrlGenerator, defaultDataServiceConfig, Bill);
  }

}
