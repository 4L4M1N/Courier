import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ErrorHandleService } from '../Others/ErrorHandle.service';
import * as global from 'src/app/shared/Global/global';
@Injectable({
  providedIn: 'root'
})
export class ErrorGuardService implements CanActivate {

constructor(public router: Router,  private errorHandle: ErrorHandleService) { }
  canActivate(): boolean {
    if(!this.errorHandle.isErrorOccured)
    {
      return false;
    }
    return true;
  }
  // TODO: small bug when back and error page appear again

}
