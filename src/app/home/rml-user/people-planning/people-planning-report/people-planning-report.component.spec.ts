import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeoplePlanningReportComponent } from './people-planning-report.component';

describe('PeoplePlanningReportComponent', () => {
  let component: PeoplePlanningReportComponent;
  let fixture: ComponentFixture<PeoplePlanningReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeoplePlanningReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeoplePlanningReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
