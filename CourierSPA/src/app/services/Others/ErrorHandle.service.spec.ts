/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorHandleService } from './ErrorHandle.service';

describe('Service: ErrorHandle', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorHandleService]
    });
  });

  it('should ...', inject([ErrorHandleService], (service: ErrorHandleService) => {
    expect(service).toBeTruthy();
  }));
});
