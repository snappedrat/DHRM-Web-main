import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardFormComponent } from './onboard-form.component';

describe('OnboardFormComponent', () => {
  let component: OnboardFormComponent;
  let fixture: ComponentFixture<OnboardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
