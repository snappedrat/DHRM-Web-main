import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSummaryReportComponent } from './test-summary-report.component';

describe('TestSummaryReportComponent', () => {
  let component: TestSummaryReportComponent;
  let fixture: ComponentFixture<TestSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSummaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
