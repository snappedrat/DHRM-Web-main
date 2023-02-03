import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdStatusComponent } from './od-status.component';

describe('OdStatusComponent', () => {
  let component: OdStatusComponent;
  let fixture: ComponentFixture<OdStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
