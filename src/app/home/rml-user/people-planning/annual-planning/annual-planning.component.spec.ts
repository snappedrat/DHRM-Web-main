import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualPlanningComponent } from './annual-planning.component';

describe('AnnualPlanningComponent', () => {
  let component: AnnualPlanningComponent;
  let fixture: ComponentFixture<AnnualPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualPlanningComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
