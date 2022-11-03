import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeAnswerComponent } from './trainee-answer.component';

describe('TraineeAnswerComponent', () => {
  let component: TraineeAnswerComponent;
  let fixture: ComponentFixture<TraineeAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeAnswerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
