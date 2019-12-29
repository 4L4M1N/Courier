/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RequestBookingService } from './request-booking.service';

describe('Service: RequestBooking', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestBookingService]
    });
  });

  it('should ...', inject([RequestBookingService], (service: RequestBookingService) => {
    expect(service).toBeTruthy();
  }));
});
