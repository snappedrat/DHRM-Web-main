import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeApplicationComponent } from './trainee-application.component';

describe('TraineeApplicationComponent', () => {
  let component: TraineeApplicationComponent;
  let fixture: ComponentFixture<TraineeApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
