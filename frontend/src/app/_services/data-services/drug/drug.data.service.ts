import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';

import { Drug } from '../../../models/drug.model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class DrugDataService extends BaseDataService<Drug> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, defaultDataServiceConfig: DefaultDataServiceConfig) {
    super('Drug', http, httpUrlGenerator, defaultDataServiceConfig, Drug);
  }

}
