import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverTimeApprComponent } from './over-time-appr.component';

describe('OverTimeApprComponent', () => {
  let component: OverTimeApprComponent;
  let fixture: ComponentFixture<OverTimeApprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverTimeApprComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverTimeApprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
