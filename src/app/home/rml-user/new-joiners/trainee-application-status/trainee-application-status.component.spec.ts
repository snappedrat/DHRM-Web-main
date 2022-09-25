import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeApplicationStatusComponent } from './trainee-application-status.component';

describe('TraineeApplicationStatusComponent', () => {
  let component: TraineeApplicationStatusComponent;
  let fixture: ComponentFixture<TraineeApplicationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeApplicationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeApplicationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
