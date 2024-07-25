import { TestBed } from '@angular/core/testing';

import { VidService } from './vid.service';

describe('VidService', () => {
  let service: VidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
