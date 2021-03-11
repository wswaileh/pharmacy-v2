import { createEntityCacheSelector, EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, first, map, tap, delay } from 'rxjs/operators';
import { IBaseModel, IBaseDTO } from '../../_models/base.model';

export class BaseEntityService<Entity extends IBaseModel<IBaseDTO, IBaseDTO>> extends EntityCollectionServiceBase<Entity> {

  protected entityCacheSelecter = createEntityCacheSelector('entityCache');

  constructor(
    entityName: string,
    private entityType: new () => Entity,
    protected serviceElementsFactory: EntityCollectionServiceElementsFactory
  ) {
    super(entityName, serviceElementsFactory);
  }

  byIdSelector = createSelector(
    this.selectors.selectEntityMap,
    entities => (id: number) => entities[id]
  );

  byIdsSelector = createSelector(
    this.selectors.selectEntityMap,
    entities => (ids: number[]) => ids.map(id => entities[id])
  );

  getAllEntities() {
    this.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          return this.getAll();
        }
        return null;
      }),
      filter(loaded => !!loaded),
      first()
    ).subscribe();
  }

  selectEntityById(id: number): Observable<Entity> {
    return this.store.pipe(
      select(this.byIdSelector),
      map(e => e[id]),
    );
  }

  selectEntitiesByIds(ids: number[]): Observable<Entity[]> {
    return this.store.pipe(
      select(this.byIdsSelector),
      map(f => f(ids)),
      );
  }


  public selectAllEntityListExcept(key: string, value: any): Observable<Entity[]> {
    return this.entities$.pipe(
      map(arr => arr.filter(e => e[key] !== value)),
    );
  }

  duplicate(entity: Entity){
    return super.add(entity);
  }

}
