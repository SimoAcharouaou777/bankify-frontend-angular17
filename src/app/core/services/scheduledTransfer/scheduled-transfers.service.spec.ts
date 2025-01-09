import { TestBed } from '@angular/core/testing';

import { ScheduledTransfersService } from './scheduled-transfers.service';

describe('ScheduledTransfersService', () => {
  let service: ScheduledTransfersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduledTransfersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
