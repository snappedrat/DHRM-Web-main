import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeOfflineTestComponent } from './trainee-offline-test.component';

describe('TraineeOfflineTestComponent', () => {
  let component: TraineeOfflineTestComponent;
  let fixture: ComponentFixture<TraineeOfflineTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineeOfflineTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeOfflineTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
