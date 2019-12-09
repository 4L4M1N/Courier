import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Booking } from 'src/app/models/booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseURL = 'http://localhost:5000/api/booking/';

constructor(private http: HttpClient) { }
  Create(booking: Booking) {
    console.log(booking);
    return this.http.post(this.baseURL + 'add', booking);
  }
}
