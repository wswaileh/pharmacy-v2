import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { filter, map } from 'rxjs/operators';
import { Drug } from '../../_models/drug.model';
import { ExpiryNotification } from '../../_models/expiry-notification.model';
import { NotificationDataService } from '../../_services/data-services/notification/notification.data.service';
import { DrugEntityService } from '../../_services/facade-services/drug/drug.service';
import { NotificationEntityService } from '../../_services/facade-services/notification/notification.service';
import { BaseComponent } from '../../_utils/base.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent extends BaseComponent<ExpiryNotification> implements OnInit {

  drugsService: DrugEntityService;

  notification: ExpiryNotification;

  results: Drug[];
  minimumDate: Date;

  constructor(
    notificationService: NotificationEntityService,
    confirmationService: ConfirmationService,
    messageService: MessageService,
    notificationDataService: NotificationDataService,
    route: ActivatedRoute,
    titleService: Title,
    drugsService: DrugEntityService,
  ) {
    super(notificationService, 'Expiry Notification', ExpiryNotification, confirmationService,
      messageService, notificationDataService, route, titleService, notificationService);
    this.drugsService = drugsService;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.drugsService.getAllEntities();
    this.minimumDate = new Date();
    this.minimumDate.setMonth(this.minimumDate.getMonth() - 1);
  }

  search(event) {
    this.drugsService.entities$.pipe(
      map(e => e.filter(f => f.name.toLowerCase().startsWith(event.query.toLowerCase())))
    ).subscribe(x => this.results = x);
  }

  getEntityDeletionMessage(entity){
    return super.getEntityDeletionMessage(entity).replace('?', '') + entity.expiringDrug.name + '?';
  }

}
