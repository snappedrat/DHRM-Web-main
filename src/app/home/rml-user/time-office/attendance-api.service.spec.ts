import { TestBed } from '@angular/core/testing';

import { AttendanceApiService } from './attendance-api.service';

describe('AttendanceApiService', () => {
  let service: AttendanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttendanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
