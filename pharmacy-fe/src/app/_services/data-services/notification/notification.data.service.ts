import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataServiceConfig, HttpUrlGenerator } from '@ngrx/data';

import { ExpiryNotification } from '../../../_models/expiry-notification.model';
import { BaseDataService } from '../base-data.service';

@Injectable()
export class NotificationDataService extends BaseDataService<ExpiryNotification> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator, defaultDataServiceConfig: DefaultDataServiceConfig) {
    super('Notification', http, httpUrlGenerator, defaultDataServiceConfig, ExpiryNotification);
  }

}
