import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftChangeApprComponent } from './shift-change-appr.component';

describe('ShiftChangeApprComponent', () => {
  let component: ShiftChangeApprComponent;
  let fixture: ComponentFixture<ShiftChangeApprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftChangeApprComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftChangeApprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
