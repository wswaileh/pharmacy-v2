import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityContextMenuComponent } from './entity-context-menu.component';

describe('EntityContextMenuComponent', () => {
  let component: EntityContextMenuComponent;
  let fixture: ComponentFixture<EntityContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityContextMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
