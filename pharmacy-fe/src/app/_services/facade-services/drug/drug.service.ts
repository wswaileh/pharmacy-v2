import { Injectable } from '@angular/core';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Drug } from '../../../models/drug.model';
import { BaseEntityService } from '../base-entity.service';

@Injectable()
export class DrugEntityService extends BaseEntityService<Drug>{

  byNameSelector = createSelector(
    this.selectors.selectEntityMap,
    entities => (name: string) => entities[name]
  );

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Drug', Drug, serviceElementsFactory);
  }

  selectEntityById(id: number): Observable<Drug> {
    return this.entities$.pipe(
      map(arr => arr.find(e => {
        return e && e.barcode === id;
      })),
    );
  }

  public selectEntitiesByName(name: string): Observable<Drug[]> {
    return this.entities$.pipe(
      map(arr => arr.filter(e => e.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()))),
    );
  }

  public selectEntityByName(name: string): Observable<Drug> {
    return this.entities$.pipe(
      map(arr => arr.find(e => e.name.toLocaleLowerCase() === name.toLocaleLowerCase())),
    );
  }

  public selectEntitiesByBarcode(barcode: number): Observable<Drug[]> {
    return this.entities$.pipe(
      map(arr => arr.filter(e => e.barcode.toString().toLocaleLowerCase().includes(barcode.toString().toLocaleLowerCase()))),
    );
  }

  public selectEntityByBarcode(barcode: number): Observable<Drug> {
    return this.entities$.pipe(
      map(arr => arr.find(e => {
        return e && e.barcode === barcode;
      })),
    );
  }

}
