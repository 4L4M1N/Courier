import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingDetailsReport } from 'src/app/models/reportsFormat/BookingDetailsReport';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingReportService {
  baseURL = 'http://localhost:5000/api/booking/';

  constructor(private http: HttpClient) { }
  
 
    async GetAllBookingDetails(FromDate, ToDate) {
      console.log(FromDate);
      let query = encodeURIComponent('FromDate') + '=' + encodeURIComponent(FromDate)
  + '&' + encodeURIComponent('ToDate') + '=' + encodeURIComponent(ToDate);
      const result = await this.http.get(this.baseURL + 'datewisereport'+ '?' + query).toPromise();
      return result;
    }

}
