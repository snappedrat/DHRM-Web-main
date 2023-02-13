import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArsLoginComponent } from './ars-login.component';

describe('ArsLoginComponent', () => {
  let component: ArsLoginComponent;
  let fixture: ComponentFixture<ArsLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArsLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
