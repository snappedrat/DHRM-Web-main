import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOffApprComponent } from './comp-off-appr.component';

describe('CompOffApprComponent', () => {
  let component: CompOffApprComponent;
  let fixture: ComponentFixture<CompOffApprComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompOffApprComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompOffApprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
