import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrViewDataComponent } from './hr-view-data.component';

describe('HrViewDataComponent', () => {
  let component: HrViewDataComponent;
  let fixture: ComponentFixture<HrViewDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrViewDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HrViewDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
