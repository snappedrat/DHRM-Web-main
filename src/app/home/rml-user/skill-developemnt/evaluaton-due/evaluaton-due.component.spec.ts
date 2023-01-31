import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluatonDueComponent } from './evaluaton-due.component';

describe('EvaluatonDueComponent', () => {
  let component: EvaluatonDueComponent;
  let fixture: ComponentFixture<EvaluatonDueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluatonDueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluatonDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
