import { TestBed } from '@angular/core/testing';

import { DaysOfWeekService } from './days-of-week.service';

describe('DaysOfWeekService', () => {
  let service: DaysOfWeekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaysOfWeekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
