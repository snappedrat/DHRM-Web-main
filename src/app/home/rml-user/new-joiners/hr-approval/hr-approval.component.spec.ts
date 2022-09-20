import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrApprovalComponent } from './hr-approval.component';

describe('HrApprovalComponent', () => {
  let component: HrApprovalComponent;
  let fixture: ComponentFixture<HrApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
