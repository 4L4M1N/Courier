import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IError } from 'src/app/models/others/IError';
import { ModalService } from '../Dialog/modal.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {
navigationExtras: NavigationExtras;
constructor(private router: Router,private modalService: ModalService) { }
public handleError(error: any){
  if (error.status == 500) {
    this.handle500Error(error.error);
  }
  if (error.status == 401) {
    this.modalService.openErrorModal(error.statusText);
  }
  if (error.status == 400) {
    console.log(error);
    // const modelError = error.error;
    // let modalStateErrors = '';
    // if (modelError && typeof modelError === 'object') {
    //     for (const key in modelError) {
    //         if (modelError[key]) {
    //           console.log(modelError[key]);
    //             modalStateErrors += modelError[key] + '\n';
    //         }
    //     }
    //     this.modalService.openErrorModal(modalStateErrors);
    // }
    if (error.error) {
      this.modalService.openErrorModal(error.error.title);
    } else {
      this.modalService.openErrorModal(error.statusText);
    }
  }
  // const applicationError = error.headers.get('Application-Error');
  // if (applicationError) {
  //     console.error(applicationError);
  //     this.modalService.openErrorModal(applicationError);
  // }
}
private handle500Error(error: any){
  this.navigationExtras = {
    queryParams:error
  };
  console.log(error);
  this.router.navigate(['/error'],this.navigationExtras);
}
}
