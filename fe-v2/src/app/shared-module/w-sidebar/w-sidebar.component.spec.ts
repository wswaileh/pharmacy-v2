import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WSidebarComponent } from './w-sidebar.component';

describe('WSidebarComponent', () => {
  let component: WSidebarComponent;
  let fixture: ComponentFixture<WSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
