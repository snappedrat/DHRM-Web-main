import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationEditComponent } from './education-edit.component';

describe('EducationEditComponent', () => {
  let component: EducationEditComponent;
  let fixture: ComponentFixture<EducationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EducationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
