import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermIdcardComponent } from './perm-idcard.component';

describe('PermIdcardComponent', () => {
  let component: PermIdcardComponent;
  let fixture: ComponentFixture<PermIdcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermIdcardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermIdcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
