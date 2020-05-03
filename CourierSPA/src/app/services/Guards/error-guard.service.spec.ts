/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrorGuardService } from './error-guard.service';

describe('Service: ErrorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorGuardService]
    });
  });

  it('should ...', inject([ErrorGuardService], (service: ErrorGuardService) => {
    expect(service).toBeTruthy();
  }));
});
