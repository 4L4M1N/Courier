/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookingReportService } from './bookingReport.service';

describe('Service: BookingReport', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookingReportService]
    });
  });

  it('should ...', inject([BookingReportService], (service: BookingReportService) => {
    expect(service).toBeTruthy();
  }));
});
