import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftChangeStatusComponent } from './shift-change-status.component';

describe('ShiftChangeStatusComponent', () => {
  let component: ShiftChangeStatusComponent;
  let fixture: ComponentFixture<ShiftChangeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftChangeStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftChangeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
