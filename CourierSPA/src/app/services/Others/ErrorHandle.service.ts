import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IError } from 'src/app/models/others/IError';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {
navigationExtras: NavigationExtras;
constructor(private router: Router) { }
public handleError(error: any){
  
  if(error.status == 500) {
   
    this.handle500Error(error);
  }
}
private handle500Error(error: any){
  this.navigationExtras = {
    queryParams:error
  };
  console.log(error);
  this.router.navigate(['/error'],this.navigationExtras);
}
}
