import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPunchApprComponent } from './forgot-punch-appr.component';

describe('ForgotPunchApprComponent', () => {
  let component: ForgotPunchApprComponent;
  let fixture: ComponentFixture<ForgotPunchApprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPunchApprComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPunchApprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
