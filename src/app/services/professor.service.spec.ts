import { TestBed } from '@angular/core/testing';

import { ProfessorsService } from './professor.service';

describe('ProfessorService', () => {
  let service: ProfessorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
