import { OnInit, Directive, ViewChild } from '@angular/core';
import { MenuItem, ConfirmationService, MessageService } from 'primeng/api';
import { BaseEntityService } from '../_services/facade-services/base-entity.service';
import { ButtonsGroupActions } from '../_utils/constants';
import { IBaseModel, IBaseDTO } from '../_models/base.model';
import { NgForm } from '@angular/forms';
import { BaseDataService } from '../_services/data-services/base-data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { sidebarItems } from '../main/main/side-bar-menu-items';
import { NotificationEntityService } from '../_services/facade-services/notification/notification.service';
import { ExpiryNotification } from '../_models/expiry-notification.model';
@Directive()
// tslint:disable-next-line: directive-class-suffix
export class BaseComponent<Entity extends IBaseModel<IBaseDTO, IBaseDTO>> implements OnInit {
  @ViewChild('entityForm') public entityForm: NgForm;

  public isLoading: boolean;

  public entities: any[];

  public selectedEntity: Entity;

  public entityService: BaseEntityService<Entity>;
  public entityDataService: BaseDataService<Entity>;

  public entityName: string;

  public entityEditorFormModel: Entity;

  public entityModalTitle: string;

  public entityModalOpened: boolean;

  public entityAction;

  public entityIdAttriuteName;

  public errors: any[];

  public confirmationService: ConfirmationService;
  public messageService: MessageService;
  public route: ActivatedRoute;
  public titleService: Title;
  public notificationService: NotificationEntityService;

  contextMenuItems: MenuItem[] = [
    {
      label: 'Edit',
      icon: 'fas fa-edit',
      command: () => this.entityActions(ButtonsGroupActions.Edit),
    },
    {
      label: 'Remove',
      icon: 'fas fa-trash-alt',
      command: () => this.entityActions(ButtonsGroupActions.Remove),
    },
  ];

  constructor(
    entityService: BaseEntityService<Entity>,
    entityName: string,
    private entityType: new () => Entity,
    confirmationService: ConfirmationService,
    messageService: MessageService,
    entityDataService: BaseDataService<Entity>,
    route: ActivatedRoute,
    titleService: Title,
    notificationService: NotificationEntityService
  ) {
    this.entityService = entityService;
    this.entityModalOpened = false;
    this.entityName = entityName;
    this.entityEditorFormModel = new this.entityType();
    this.entityIdAttriuteName = this.entityEditorFormModel.ID_ATTR_NAME;
    this.confirmationService = confirmationService;
    this.messageService = messageService;
    this.entityDataService = entityDataService;
    this.route = route;
    this.titleService = titleService;
    this.notificationService = notificationService;
    this.errors = [];
  }

  ngOnInit(): void {
    this.entityService.loading$.subscribe(
      (loading) => (this.isLoading = loading)
    );
    this.entityService.getAllEntities();
    this.entityService.entities$.subscribe((entities) => {
      this.entities = entities;
      this.afterEntityDataFetch();
    });

    this.initNotifications();

    this.entityService.errors$.subscribe((error) => this.handleError(error.payload.data.error));
  }

  initNotifications() {
    this.notificationService.loaded$.subscribe((isLoaded) => {
      if (!isLoaded) {
        this.notificationService.getAllEntities();
      }
    });

    // TODO: call notification service instead
    this.notificationService.getNotificationsCount().subscribe((notificationsCount) => {
      if (notificationsCount > 0) {
        this.titleService.setTitle('(' + notificationsCount + ')' + ' Lana Pharmacy');
        const notificationsItem = sidebarItems.find(item => item.itemName === '').
          items.find(subItem => subItem.itemName === 'Expiries');
        notificationsItem.notificationsCount = notificationsCount + '';
        notificationsItem.isWithNotificationCount = true;
      } else {
        this.titleService.setTitle('Lana Pharmacy');
        const notificationsItem = sidebarItems.find(item => item.itemName === '').
          items.find(subItem => subItem.itemName === 'Expiries');
        notificationsItem.isWithNotificationCount = false;
      }
    });
  }
  afterEntityDataFetch() { }

  afterEntityUpdate() { }

  closeEntityModal() {
    this.entityForm.reset();
    this.entityModalOpened = false;
    this.entityEditorFormModel = new this.entityType();
  }

  submitEntityModal() {
    if (this.entityAction === ButtonsGroupActions.Add) {
      this.entityService
        .add(this.entityEditorFormModel.toDTO() as Entity)
        .subscribe((x) => {
          this.closeEntityModal();
          this.selectedEntity = x;
          this.emitSucessToast(this.selectedEntity);
        });
    } else if (this.entityAction === ButtonsGroupActions.Edit) {
      this.entityService
        .update(this.entityEditorFormModel.toDTO() as Entity)
        .subscribe((x) => {
          this.closeEntityModal();
          this.selectedEntity = x;
          this.emitSucessToast(this.selectedEntity);
          this.afterEntityUpdate();
        });
    } else if (this.entityAction === ButtonsGroupActions.Remove) {
      const deletedEntity = this.selectedEntity;
      this.entityService.delete(this.selectedEntity).subscribe((_) => {
        this.emitSucessToast(deletedEntity);
      });
    } else if (this.entityAction === ButtonsGroupActions.Duplicate) {
      this.entityService
        .duplicate(this.entityEditorFormModel.toDTO() as Entity)
        .subscribe((x) => {
          this.closeEntityModal();
          this.selectedEntity = x;
          this.emitSucessToast(this.selectedEntity);
        });
    }
  }

  entityActions(actionType) {
    this.entityAction = actionType;
    switch (actionType) {
      case ButtonsGroupActions.Add:
        this.entityModalTitle = 'New ' + this.entityName;
        this.entityModalOpened = true;
        break;
      case ButtonsGroupActions.Edit:
        this.entityModalTitle = 'Edit ' + this.entityName;

        if (this.selectedEntity instanceof this.entityType) {
          this.entityEditorFormModel = this.selectedEntity.clone() as Entity;
        } else {
          this.entityEditorFormModel = new this.entityType().fromDTO(this.selectedEntity);
        }

        this.entityModalOpened = true;
        break;
      case ButtonsGroupActions.Duplicate:
        this.entityModalTitle = 'Duplicate ' + this.entityName;

        if (this.selectedEntity instanceof this.entityType) {
          this.entityEditorFormModel = this.selectedEntity.clone() as Entity;
        } else {
          this.entityEditorFormModel = new this.entityType().fromDTO(this.selectedEntity);
        }

        this.entityModalOpened = true;
        break;
      case ButtonsGroupActions.Remove:
        this.confirmationService.confirm({
          message: this.getEntityDeletionMessage(this.selectedEntity),
          accept: () => {
            this.submitEntityModal();
          },
        });
        break;
    }
  }

  emitFailureToast(summary, detail){
    this.messageService.add({
      severity: 'error',
      summary,
      detail
    });
  }

  emitSucessToast(entity) {
    this.messageService.add({
      severity: 'success',
      summary: this.entityAction + 'ed Successfully',
      detail: this.getEntityDetailsMessage(entity),
    });
  }

  getEntityDetailsMessage(entity) {
    return this.entityName + ' ' + this.entityAction + 'ed Successfully';
  }

  getEntityDeletionMessage(entity) {
    return 'Are you sure that you want to delete ?';
  }

  handleError(error) {
    this.errors = [];
    if (error) {
      this.emitFailureToast('Error', error.message);
    }
  }
}
