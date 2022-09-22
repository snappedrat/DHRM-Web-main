import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeNewApplicationComponent } from './trainee-new-application.component';

describe('TraineeNewApplicationComponent', () => {
  let component: TraineeNewApplicationComponent;
  let fixture: ComponentFixture<TraineeNewApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeNewApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeNewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
