import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityContextMenuComponent } from './entity-context-menu.component';

describe('EntityContextMenuComponent', () => {
  let component: EntityContextMenuComponent;
  let fixture: ComponentFixture<EntityContextMenuComponent>;

  beforeEach(waitForAsync(() => {
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
