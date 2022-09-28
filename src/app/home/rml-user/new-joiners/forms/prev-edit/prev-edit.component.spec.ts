import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevEditComponent } from './prev-edit.component';

describe('PrevEditComponent', () => {
  let component: PrevEditComponent;
  let fixture: ComponentFixture<PrevEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
