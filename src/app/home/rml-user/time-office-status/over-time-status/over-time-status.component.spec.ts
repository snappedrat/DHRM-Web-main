import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverTimeStatusComponent } from './over-time-status.component';

describe('OverTimeStatusComponent', () => {
  let component: OverTimeStatusComponent;
  let fixture: ComponentFixture<OverTimeStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverTimeStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OverTimeStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
