/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ItemcreationService } from './itemcreation.service';

describe('Service: Itemcreation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemcreationService]
    });
  });

  it('should ...', inject([ItemcreationService], (service: ItemcreationService) => {
    expect(service).toBeTruthy();
  }));
});
