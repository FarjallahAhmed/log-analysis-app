import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertingComponent } from './alerting.component';

describe('AlertingComponent', () => {
  let component: AlertingComponent;
  let fixture: ComponentFixture<AlertingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
