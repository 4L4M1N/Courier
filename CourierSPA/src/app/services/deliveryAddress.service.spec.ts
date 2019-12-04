/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DeliveryAddressService } from './deliveryAddress.service';

describe('Service: DeliveryAddress', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryAddressService]
    });
  });

  it('should ...', inject([DeliveryAddressService], (service: DeliveryAddressService) => {
    expect(service).toBeTruthy();
  }));
});
