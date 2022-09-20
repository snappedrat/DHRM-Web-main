import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPunchComponent } from './forget-punch.component';

describe('ForgetPunchComponent', () => {
  let component: ForgetPunchComponent;
  let fixture: ComponentFixture<ForgetPunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPunchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
