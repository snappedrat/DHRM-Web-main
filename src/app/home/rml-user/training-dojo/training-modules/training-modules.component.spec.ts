import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingModulesComponent } from './training-modules.component';

describe('TrainingModulesComponent', () => {
  let component: TrainingModulesComponent;
  let fixture: ComponentFixture<TrainingModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingModulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
