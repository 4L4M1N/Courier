/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DivisionZoneService } from './divisionZone.service';

describe('Service: DivisionZone', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DivisionZoneService]
    });
  });

  it('should ...', inject([DivisionZoneService], (service: DivisionZoneService) => {
    expect(service).toBeTruthy();
  }));
});
