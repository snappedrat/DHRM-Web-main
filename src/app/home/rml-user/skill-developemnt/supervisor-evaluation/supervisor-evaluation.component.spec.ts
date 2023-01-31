import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorEvaluationComponent } from './supervisor-evaluation.component';

describe('SupervisorEvaluationComponent', () => {
  let component: SupervisorEvaluationComponent;
  let fixture: ComponentFixture<SupervisorEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisorEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
