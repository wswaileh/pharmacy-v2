import { EntityDataModuleConfig, EntityMetadataMap } from '@ngrx/data';
import { Bill } from '../_models/Bill.model';

const entityMetadata: EntityMetadataMap = {
  Drug: {
    selectId: drugSelectBarcode,
    sortComparer: sortByName
  },
  Bill: {
    selectId: billSelectId,
    sortComparer: sortByDate
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
  return a.date > b.date ? -1 : a.date === b.date ? 0 : 1;
}

export function drugSelectBarcode<T extends { barcode: any }>(entity: T) {
  return entity == null ? undefined : entity.barcode;
}

export function billSelectId<T extends { _id: any }>(entity: T) {
  return entity == null ? undefined : entity._id;
}
