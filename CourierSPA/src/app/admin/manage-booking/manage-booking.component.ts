import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/Booking/booking.service';
import { BookingView } from 'src/app/models/View/bookingView';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  bookingList: any;
  public displayedColumns = ['id', 'receiverName', 'delivManName', 'zone'];
  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.GetAllBooking();
  }
  GetAllBooking() {
    this.bookingService.GetAllBooking().subscribe((bookingList: BookingView[]) => {
      this.bookingList = bookingList;
      console.log(this.bookingList);
    }, error => {
      console.log('error');
    })
  }
}
