import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeLoginComponent } from './trainee-login.component';

describe('TraineeLoginComponent', () => {
  let component: TraineeLoginComponent;
  let fixture: ComponentFixture<TraineeLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
