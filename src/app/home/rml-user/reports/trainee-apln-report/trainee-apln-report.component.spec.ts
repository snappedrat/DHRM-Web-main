import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeAplnReportComponent } from './trainee-apln-report.component';

describe('TraineeAplnReportComponent', () => {
  let component: TraineeAplnReportComponent;
  let fixture: ComponentFixture<TraineeAplnReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeAplnReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeAplnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
