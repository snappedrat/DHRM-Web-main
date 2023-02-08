import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftChangeComponent } from './shift-change.component';

describe('ShiftChangeComponent', () => {
  let component: ShiftChangeComponent;
  let fixture: ComponentFixture<ShiftChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShiftChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
