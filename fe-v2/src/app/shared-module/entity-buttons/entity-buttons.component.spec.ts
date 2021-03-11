import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityButtonsComponent } from './entity-buttons.component';

describe('EntityButtonsComponent', () => {
  let component: EntityButtonsComponent;
  let fixture: ComponentFixture<EntityButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
