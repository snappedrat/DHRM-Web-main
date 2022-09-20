import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptComponent } from './dept.component';

describe('DeptComponent', () => {
  let component: DeptComponent;
  let fixture: ComponentFixture<DeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
