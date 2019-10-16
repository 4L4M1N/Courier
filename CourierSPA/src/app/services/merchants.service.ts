import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { IMerchants } from '../models/IMerchants';


@Injectable({
  providedIn: 'root'
})
export class MerchantsService {

baseUrl = 'assets/Data/merchants.json';
constructor(private http: HttpClient) { }

getMerchants(): Observable<IMerchants[]> {
  return this.http.get<IMerchants[]>(this.baseUrl).pipe(catchError(this.handleError))
}


private handleError(err: HttpErrorResponse) {
  // in a real world app, we may send the server to some remote logging infrastructure
  // instead of just logging it to the console
  let errorMessage = '';
  if (err.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    errorMessage = `An error occurred: ${err.error.message}`;
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
  }
  console.error(errorMessage);
  return throwError(errorMessage);
}
}
