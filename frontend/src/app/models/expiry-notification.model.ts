import { IBaseModel } from './base.model';
import { Drug } from './drug.model';

export interface IExpiryNotificationDTO {
  id: string;
  expiringDrug: Drug;
  reminderDate: Date;
}

export class ExpiryNotification implements IBaseModel<IExpiryNotificationDTO, IExpiryNotificationDTO>{
  ID_ATTR_NAME = 'id';

  id: string | undefined;
  reminderDate: Date | undefined;
  expiringDrug: Drug | undefined;

  fromDTO(input: IExpiryNotificationDTO) {
    this.id = input.id;
    this.expiringDrug = input.expiringDrug;
    this.reminderDate = new Date(input.reminderDate);
    return this;
  }
  toDTO(): IExpiryNotificationDTO {
    return {
      id: this.id,
      expiringDrug: this.expiringDrug,
      reminderDate: this.reminderDate
    } as IExpiryNotificationDTO;
  }
  clone(): IBaseModel<IExpiryNotificationDTO, IExpiryNotificationDTO> {
    const clonedObj = new ExpiryNotification();
    clonedObj.id = this.id;
    clonedObj.expiringDrug = this.expiringDrug;
    clonedObj.reminderDate = this.reminderDate;
    return clonedObj;
  }
}
