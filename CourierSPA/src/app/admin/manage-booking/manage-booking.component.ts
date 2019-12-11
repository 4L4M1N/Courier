import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/Booking/booking.service';
import { BookingView } from 'src/app/models/View/bookingView';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { AssignDelivManComponent } from '../assignDelivMan/assignDelivMan.component';
import { DeliveryManService } from 'src/app/services/DeliveryMan.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  bookingList: any;
  public displayedColumns = ['id', 'receiverName', 'delivManName', 'zone'];
  dialogValue:string; 
  sendValue:string;
  name:string;
  color:string;
  delivManList:any;
  constructor(private bookingService: BookingService, private dialog: MatDialog, private deliveryManService: DeliveryManService) { }

  ngOnInit() {
    this.GetAllBooking();
    this.GetDelivManList();
  }
  GetAllBooking() {
    this.bookingService.GetAllBooking().subscribe((bookingList: BookingView[]) => {
      this.bookingList = bookingList;
      console.log(this.bookingList);
    }, error => {
      console.log('error');
    })
  }
  GetDelivManList() {
    this.deliveryManService.GetAllDelivaryMan().subscribe(res => {
      this.delivManList = res;
      console.log(this.delivManList);
    });
  }
  openDialog(): void {
    
    const dialogRef = this.dialog.open(AssignDelivManComponent, {
      width: '250px',
      data: { name: this.name, color: this.color, delivManList: this.delivManList }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
      console.log(this.color);
    });
  }
}
