import { TestBed } from '@angular/core/testing';

import { PlantcodeService } from './plantcode.service';

describe('PlantcodeService', () => {
  let service: PlantcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
