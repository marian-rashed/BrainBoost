import { TestBed } from '@angular/core/testing';

import { SubscriptionService } from './subscription-service';

describe('PricingServiceService', () => {
  let service: SubscriptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
