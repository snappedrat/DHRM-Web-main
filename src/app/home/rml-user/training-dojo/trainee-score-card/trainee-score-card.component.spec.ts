import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeScoreCardComponent } from './trainee-score-card.component';

describe('TraineeScoreCardComponent', () => {
  let component: TraineeScoreCardComponent;
  let fixture: ComponentFixture<TraineeScoreCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeScoreCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeScoreCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
