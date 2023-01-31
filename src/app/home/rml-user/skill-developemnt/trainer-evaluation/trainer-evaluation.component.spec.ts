import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerEvaluationComponent } from './trainer-evaluation.component';

describe('TrainerEvaluationComponent', () => {
  let component: TrainerEvaluationComponent;
  let fixture: ComponentFixture<TrainerEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainerEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
