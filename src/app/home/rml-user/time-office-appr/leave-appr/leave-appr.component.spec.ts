import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveApprComponent } from './leave-appr.component';

describe('LeaveApprComponent', () => {
  let component: LeaveApprComponent;
  let fixture: ComponentFixture<LeaveApprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveApprComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveApprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
