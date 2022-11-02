import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeTestComponent } from './trainee-test.component';

describe('TraineeTestComponent', () => {
  let component: TraineeTestComponent;
  let fixture: ComponentFixture<TraineeTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
