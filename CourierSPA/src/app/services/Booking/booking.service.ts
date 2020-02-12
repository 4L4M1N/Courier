import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Booking } from 'src/app/models/booking';
import { Observable } from 'rxjs';
import { BookingView } from 'src/app/models/View/bookingView';

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
  GetAllBooking(): Observable<BookingView[]> {
    return this.http.get<BookingView[]>(this.baseURL + 'all');
  }
  GetBookingSerial(merchantId)
  {
    console.log(merchantId);
    return this.http.get(this.baseURL + 'getbookingserial/'+ merchantId);
  }
  AssignDelivManToBooking(model: any) {
    console.log(model);
    return this.http.post(this.baseURL + 'assign' , model);
  }
  SetStatusOfBooking(model: any) {
    console.log(model);
    return this.http.post(this.baseURL + 'setbookingstatus' , model);
  }
}
