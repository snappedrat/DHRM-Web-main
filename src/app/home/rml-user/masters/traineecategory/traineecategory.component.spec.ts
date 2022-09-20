import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineecategoryComponent } from './traineecategory.component';

describe('TraineecategoryComponent', () => {
  let component: TraineecategoryComponent;
  let fixture: ComponentFixture<TraineecategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraineecategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
