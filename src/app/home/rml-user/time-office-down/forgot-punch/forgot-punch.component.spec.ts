import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPunchComponent } from './forgot-punch.component';

describe('ForgotPunchComponent', () => {
  let component: ForgotPunchComponent;
  let fixture: ComponentFixture<ForgotPunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPunchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
