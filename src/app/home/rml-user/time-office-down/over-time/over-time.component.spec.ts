import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverTimeComponent } from './over-time.component';

describe('OverTimeComponent', () => {
  let component: OverTimeComponent;
  let fixture: ComponentFixture<OverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
