import { Component, OnInit, ViewChild } from '@angular/core';
import { BookingService } from 'src/app/services/Booking/booking.service';
import { BookingView } from 'src/app/models/View/bookingView';
import { MatDialog, MatDialogRef, MatDialogConfig, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AssignDelivManComponent } from '../assignDelivMan/assignDelivMan.component';
import { DeliveryManService } from 'src/app/services/DeliveryMan.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';
import { SetStatusComponent } from '../setStatus/setStatus.component';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  
  bookingList: any;
  pending="pending";
  public displayedColumns = [ 'bookingSerialNo', 'merchantName',  'receiverName', 'delivManName', 'zone', 'actions', 'status'];
  //  public displayedColumns = ['id', 'bookingSerialNo', 'merchantName',  'receiverName', 'delivManName', 'zone'];
  dialogValue:string; 
  sendValue:string;
  selectedDelivManId:string;
  selectedStatusId:number;
  color:string;
  delivManList:any;
  statusList:any;
  bookingId:string;
  datasource: any;
  statusvalue:string;
  status = [
    {value: 'onway', viewValue: 'On Way'},
    {value: 'delevered', viewValue: 'Delevered'},
    {value: 'pending', viewValue: 'Pending'}
  ];
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private bookingService: BookingService, private dialog: MatDialog,
              private deliveryManService: DeliveryManService,
              private modalService: ModalService,
              private statusService: StatusService) { }

  ngOnInit() {
    this.GetAllBooking();
    this.GetDelivManList();
    this.GetStatusList();
    // this.selected =  'option2';
  }
  applyFilter(filterValue: string) {
    this.datasource.filter = filterValue.trim().toLowerCase();
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
  GetStatusList() {
    this.statusService.GetAllStaus().subscribe(res => {
      this.statusList = res;
      console.log(this.statusList);
    });
  }
  onSelect(ab, event) {
    console.log(ab);
    console.log(event);
  }
  openDialog(a): void {
    console.log(a);
    this.bookingId = a;
    const dialogRef = this.dialog.open(AssignDelivManComponent, {
      width: '600px',
      data: { name: this.selectedDelivManId, delivManList: this.delivManList }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
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
  openStatusDialog(a): void {
    console.log(a);
    this.bookingId = a;
    const dialogRef = this.dialog.open(SetStatusComponent, {
      width: '600px',
      data: { name: this.selectedStatusId, statusList: this.statusList }
    });

    dialogRef.afterClosed().subscribe(res => {
      this.selectedStatusId = res;
      if(this.selectedStatusId == null) console.log("no value");
      console.log(this.selectedStatusId);
      console.log(this.bookingId);

      // assign
      if(this.bookingId != null && this.selectedStatusId != null) {
        let setStatusOfBooking = {
          bookingId : this.bookingId,
          selectedStatusId: this.selectedStatusId
        };
        console.log("true");
        this.bookingService.SetStatusOfBooking(setStatusOfBooking).subscribe(() => {
          console.log('ok');
          this.openInfoModal();
          this.GetAllBooking();
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
