/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeliveryManService } from './DeliveryMan.service';

describe('Service: DeliveryMan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryManService]
    });
  });

  it('should ...', inject([DeliveryManService], (service: DeliveryManService) => {
    expect(service).toBeTruthy();
  }));
});
