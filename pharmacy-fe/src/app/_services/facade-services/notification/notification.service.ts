import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map, tap } from 'rxjs/operators';
import { ExpiryNotification } from '../../../_models/expiry-notification.model';
import { BaseEntityService } from '../base-entity.service';


@Injectable()
export class NotificationEntityService extends BaseEntityService<ExpiryNotification>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Notification', ExpiryNotification, serviceElementsFactory);
  }

  getNotificationsCount() {
    return this.entities$.pipe(
      map(e => {
        return e ? e.length : 0;
      })
    );
  }

}
