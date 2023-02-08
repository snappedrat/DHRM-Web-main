import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdApprComponent } from './od-appr.component';

describe('OdApprComponent', () => {
  let component: OdApprComponent;
  let fixture: ComponentFixture<OdApprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdApprComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdApprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
