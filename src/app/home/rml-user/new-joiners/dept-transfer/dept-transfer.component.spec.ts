import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptTransferComponent } from './dept-transfer.component';

describe('DeptTransferComponent', () => {
  let component: DeptTransferComponent;
  let fixture: ComponentFixture<DeptTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
