import { Component, OnInit } from '@angular/core';
import { RequestBookingService } from 'src/app/services/Booking/request-booking.service';
import { RequestBooking } from 'src/app/models/RequestBooking';

@Component({
  selector: 'app-manage-requested-booking',
  templateUrl: './manage-requested-booking.component.html',
  styleUrls: ['./manage-requested-booking.component.css']
})
export class ManageRequestedBookingComponent implements OnInit {

  public displayedColumns = ['name', 'phone', 'email', 'bookingItems'];
  requestedBookingList: any;
  constructor(private requestBookingService: RequestBookingService) { }

  ngOnInit() {
    this.GetAllRequestedBooking();
  }
  GetAllRequestedBooking() {
    this.requestBookingService.GetAllBookingRequest().subscribe((bookingList: RequestBooking[]) => {
      this.requestedBookingList = bookingList;
      console.log(this.requestedBookingList);
    }, error => {
      console.log('error');
    })
  }

}
