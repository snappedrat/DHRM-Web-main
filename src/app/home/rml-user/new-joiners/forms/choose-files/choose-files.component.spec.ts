import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFilesComponent } from './choose-files.component';

describe('ChooseFilesComponent', () => {
  let component: ChooseFilesComponent;
  let fixture: ComponentFixture<ChooseFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
