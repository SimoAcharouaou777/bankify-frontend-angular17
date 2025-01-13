import { TestBed } from '@angular/core/testing';

import { LoansService } from './loans.service';

describe('LoansService', () => {
  let service: LoansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
