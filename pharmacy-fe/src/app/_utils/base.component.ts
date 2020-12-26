import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BaseEntityService } from '../_services/facade-services/base-entity.service';

@Component({
  selector: 'app-base-component',
  template: '',
})
export class BaseComponent<Entity> implements OnInit {

  isLoading: boolean;

  entities: Entity[];

  selectedEntity: Entity;

  entityService: BaseEntityService<Entity>;

  contextMenuItems: MenuItem[] = [
    { label: 'Edit', icon: 'fas fa-edit', command: () => this.entityActions('Edit') },
    { label: 'Remove', icon: 'fas fa-trash-alt', command: () => this.entityActions('Remove') }
  ];

  constructor(entityService: BaseEntityService<Entity>) {
    this.entityService = entityService;
  }

  ngOnInit(): void {
    this.entityService.loading$.subscribe((loading) => this.isLoading = loading);
    this.entityService.getAllEntities();
    this.entityService.entities$.subscribe((entities) => this.entities = entities);
  }

  entityActions(actionType) {
    console.log(actionType);
  }

}
