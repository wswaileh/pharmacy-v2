import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { Bill } from '../_models/bill.model';
import { ExpiryNotification } from '../_models/expiry-notification.model';

const entityMetadata: EntityMetadataMap = {
  Drug: {
    selectId: drugSelectBarcode,
    sortComparer: sortByName
  },
  Bill: {
    selectId: entitySelectId,
    sortComparer: sortByDate
  },
  Notification: {
    selectId: entitySelectId,
    sortComparer: sortExpiryByDate
  }
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

/** Sort Comparer to sort the entity collection by its name property */
export function sortByName(a: { name: string }, b: { name: string }): number {
  return a.name.localeCompare(b.name);
}

export function sortByDate(a: Bill, b: Bill) {
  return a.time > b.time ? -1 : a.time === b.time ? 0 : 1;
}

export function sortExpiryByDate(a: ExpiryNotification, b: ExpiryNotification) {
  return a.reminderDate > b.reminderDate ? 1 : a.reminderDate === b.reminderDate ? sortByName(a.expiringDrug, b.expiringDrug) : -1;
}

export function drugSelectBarcode<T extends { barcode: any }>(entity: T) {
  return entity == null ? undefined : entity.barcode;
}

export function entitySelectId<T extends { id: string }>(entity: T) {
  return entity == null ? undefined : entity.id;
}
