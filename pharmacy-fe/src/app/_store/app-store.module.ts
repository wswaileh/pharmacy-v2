import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import {
  EntityDataModule,
  DefaultDataServiceConfig,
  EntityDataService,
} from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { DrugDataService } from '../_services/data-services/drug/drug.data.service';
import { BillDataService } from '../_services/data-services/bill/bill.data.service';
import { NotificationDataService } from '../_services/data-services/notification/notification.data.service';

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: '/',
  timeout: 3000, // request timeout
};

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],

  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    DrugDataService,
    BillDataService,
    NotificationDataService
  ],
})
export class AppStoreModule {
  constructor(
    entityDataService: EntityDataService,
    drugDataService: DrugDataService,
    billDataService: BillDataService,
    notificationDataService: NotificationDataService,
  ) {
    entityDataService.registerService('Drug', drugDataService);
    entityDataService.registerService('Bill', billDataService);
    entityDataService.registerService('Notification', notificationDataService);
  }


  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: AppStoreModule
    };
  }
}
