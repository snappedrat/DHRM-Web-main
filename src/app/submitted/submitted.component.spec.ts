import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedComponent } from './submitted.component';

describe('SubmittedComponent', () => {
  let component: SubmittedComponent;
  let fixture: ComponentFixture<SubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmittedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
