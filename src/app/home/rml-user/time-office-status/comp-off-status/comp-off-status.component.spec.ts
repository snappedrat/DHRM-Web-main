import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOffStatusComponent } from './comp-off-status.component';

describe('CompOffStatusComponent', () => {
  let component: CompOffStatusComponent;
  let fixture: ComponentFixture<CompOffStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompOffStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompOffStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
