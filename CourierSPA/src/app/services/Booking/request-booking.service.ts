import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestBooking } from 'src/app/models/RequestBooking';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestBookingService {
  baseURL = 'http://localhost:5000/api/requestbooking/';
constructor(private http: HttpClient) { }
Create(requestBooking: RequestBooking) {
  return this.http.post(this.baseURL + 'add', requestBooking);
}
GetAllBookingRequest(): Observable<RequestBooking[]> {
  return this.http.get<RequestBooking[]>(this.baseURL + 'all');
}

}
