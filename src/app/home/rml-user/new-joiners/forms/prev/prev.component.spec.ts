import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevComponent } from './prev.component';

describe('PrevComponent', () => {
  let component: PrevComponent;
  let fixture: ComponentFixture<PrevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrevComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
