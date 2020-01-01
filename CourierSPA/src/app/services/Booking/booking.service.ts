import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Booking } from 'src/app/models/booking';
import { Observable } from 'rxjs';
import { BookingView } from 'src/app/models/View/bookingView';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  baseURL = 'http://amin601-001-site1.gtempurl.com/api/booking/';

constructor(private http: HttpClient) { }

Create(booking: Booking) {
    console.log(booking);
    return this.http.post(this.baseURL + 'add', booking);
  }
  GetAllBooking(): Observable<BookingView[]> {
    return this.http.get<BookingView[]>(this.baseURL + 'all');
  }
  AssignDelivManToBooking(model: any) {
    console.log(model);
    return this.http.post(this.baseURL + 'assign' , model);
  }
}
