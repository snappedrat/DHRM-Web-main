import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationDueReportComponent } from './evaluation-due-report.component';

describe('EvaluationDueReportComponent', () => {
  let component: EvaluationDueReportComponent;
  let fixture: ComponentFixture<EvaluationDueReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationDueReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluationDueReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
