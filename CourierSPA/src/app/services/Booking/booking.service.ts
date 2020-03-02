import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Booking } from 'src/app/models/booking';
import { Observable } from 'rxjs';
import { BookingView } from 'src/app/models/viewModels/bookingView';
import { Receiver } from 'src/app/models/receiver';

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
  Update(booking: Booking)
  {
    console.log(booking);
    const receiver: Receiver = {
      Id: booking.receiverId,
      Email: booking.receiverEmail,
      ZoneId: booking.zoneId,
      Phone: booking.receiverPhone,
      Address: booking.receiverAddress,
      Name: booking.receiverName
    };
    var data = {
      booking: booking,
      receiver: receiver
    };
    return this.http.put(this.baseURL + 'update', data);
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
  SearchBooking(SerialNo: any) {
    let query = encodeURIComponent('SerialNo') + '=' + encodeURIComponent(SerialNo);
    return this.http.get(this.baseURL + 'search' + '?' + query);
  }
}
