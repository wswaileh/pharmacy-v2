import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { map, tap } from 'rxjs/operators';
import { ExpiryNotification } from '../../../models/expiry-notification.model';
import { BaseEntityService } from '../base-entity.service';


@Injectable()
export class NotificationEntityService extends BaseEntityService<ExpiryNotification>{

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Notification', ExpiryNotification, serviceElementsFactory);
  }

  getNotificationsCount() {
    const currentDate = new Date();
    return this.entities$.pipe(
      map(e => {
        return e ?
          e.filter(item => item.reminderDate.getMonth() === currentDate.getMonth()
            && item.reminderDate.getFullYear() === currentDate.getFullYear())
            .length

          : 0;
      })
    );
  }

}
