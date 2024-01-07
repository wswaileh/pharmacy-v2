import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EntityButtonsComponent } from './entity-buttons.component';

describe('EntityButtonsComponent', () => {
  let component: EntityButtonsComponent;
  let fixture: ComponentFixture<EntityButtonsComponent>;

  beforeEach(waitForAsync(() => {
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
