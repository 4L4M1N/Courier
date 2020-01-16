import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from 'src/app/services/Booking/booking.service';
import { BookingView } from 'src/app/models/View/bookingView';
import { MatDialog, MatDialogRef, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AssignDelivManComponent } from '../assignDelivMan/assignDelivMan.component';
import { DeliveryManService } from 'src/app/services/DeliveryMan.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  
  bookingList: any;
  public displayedColumns = ['id', 'bookingSerialNo', 'merchantName',  'receiverName', 'delivManName', 'zone'];
 
  dialogValue:string; 
  sendValue:string;
  selectedDelivManId:string;
  color:string;
  delivManList:any;
  bookingId:string;
  datasource: any;

  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private bookingService: BookingService, private dialog: MatDialog,
              private deliveryManService: DeliveryManService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.GetAllBooking();
    this.GetDelivManList();
    
  }
  GetAllBooking() {
    this.bookingService.GetAllBooking().subscribe((bookingList: BookingView[]) => {
      this.bookingList = bookingList;
      console.log(this.bookingList);
      this.datasource = new MatTableDataSource(this.bookingList);
      this.datasource.paginator = this.paginator;
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
  openDialog(a): void {
    console.log(a);
    this.bookingId = a;
    const dialogRef = this.dialog.open(AssignDelivManComponent, {
      width: '600px',
      data: { name: this.selectedDelivManId, delivManList: this.delivManList }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.selectedDelivManId = res;
      if(this.selectedDelivManId == null) console.log("no value");
      console.log(this.selectedDelivManId);

      // assign
      if(this.bookingId != null && this.selectedDelivManId != null) {
        let assign = {
          bookingId : this.bookingId,
          delivManId: this.selectedDelivManId
        };
        console.log("true");
        this.bookingService.AssignDelivManToBooking(assign).subscribe(() => {
          console.log('ok');
          this.openInfoModal();
        }, error => {
          console.log('error');
        });
      }
    });
  }
  openInfoModal() {
    this.modalService.openInfoModal('Successfully Assigned');
  }
}
