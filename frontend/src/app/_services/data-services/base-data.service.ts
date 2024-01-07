import {
  DefaultDataService,
  HttpUrlGenerator,
  DefaultDataServiceConfig,
} from '@ngrx/data';
import { IBaseModel, IBaseDTO } from '../../models/base.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Update } from '@ngrx/entity';

export class BaseDataService<
  Entity extends IBaseModel<IBaseDTO, IBaseDTO>
> extends DefaultDataService<Entity> {
  constructor(
    entityName: string,
    http: HttpClient,
    httpUrlGenerator: HttpUrlGenerator,
    defaultDataServiceConfig: DefaultDataServiceConfig,
    public entityType: new () => Entity,
    protected endPoint?: string
  ) {
    super(entityName, http, httpUrlGenerator);
    endPoint = endPoint ? endPoint : entityName.toLowerCase() + 's';
    this.entitiesUrl =
      this.entityUrl = `${defaultDataServiceConfig.root}${endPoint}/`;
  }

  override getAll(): Observable<Entity[]> {
    return super
      .getAll()
      .pipe(
        map((entities) =>
          entities.map((entity) => new this.entityType().fromDTO(entity))
        )
      );
  }

  override getById(id: string | number): Observable<Entity> {
    return super
      .getById(id)
      .pipe(map((entity) => new this.entityType().fromDTO(entity)));
  }

  override add(entity: Entity): Observable<Entity> {
    return super.add(entity).pipe(
      map((newEntity) => {
        if (newEntity) {
          return new this.entityType().fromDTO(newEntity);
        }
      })
    );
  }

  override update(entity: Update<Entity>): Observable<Entity> {
    return super.update(entity).pipe(
      map((updatedEntity) => {
        return new this.entityType().fromDTO(updatedEntity);
      })
    );
  }

  duplicate(entity: Entity) {
    return super.add(entity).pipe(
      map((newEntity) => {
        if (newEntity) {
          return new this.entityType().fromDTO(newEntity);
        }
      })
    );
  }
}
