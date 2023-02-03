import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPunchStatusComponent } from './forgot-punch-status.component';

describe('ForgotPunchStatusComponent', () => {
  let component: ForgotPunchStatusComponent;
  let fixture: ComponentFixture<ForgotPunchStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPunchStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPunchStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
