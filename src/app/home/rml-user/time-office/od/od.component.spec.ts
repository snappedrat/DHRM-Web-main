import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdComponent } from './od.component';

describe('OdComponent', () => {
  let component: OdComponent;
  let fixture: ComponentFixture<OdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
