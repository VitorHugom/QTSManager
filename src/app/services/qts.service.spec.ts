import { TestBed } from '@angular/core/testing';

import { QtsService } from './qts.service';

describe('QtsService', () => {
  let service: QtsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QtsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
