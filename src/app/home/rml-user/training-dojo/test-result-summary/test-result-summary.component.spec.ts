import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultSummaryComponent } from './test-result-summary.component';

describe('TestResultSummaryComponent', () => {
  let component: TestResultSummaryComponent;
  let fixture: ComponentFixture<TestResultSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestResultSummaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestResultSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
