import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardComponent } from './onboard.component';

describe('OnboardComponent', () => {
  let component: OnboardComponent;
  let fixture: ComponentFixture<OnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
