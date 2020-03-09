import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material';
import { DatePipe } from '@angular/common';
import { BookingReportService } from 'src/app/services/Report/booking/bookingReport.service';
import { BookingDetailsRpt } from 'src/app/reports/Booking/BookingDetailsRpt';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {BookingDetailsReport } from 'src/app/models/reportsFormat/BookingDetailsReport';
import { delay } from 'rxjs/operators';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-bookingreport',
  templateUrl: './bookingreport.component.html',
  styleUrls: ['./bookingreport.component.css']
 
})
export class BookingreportComponent implements OnInit {
  // date = new FormControl(new Date());
  Fromdate:any;
  ToDate:any;
  apiFormdate: any;
  apiToDate:any;
  reportNumber = 0;
  bookingDetails: any;
  constructor(private datePipe: DatePipe, private bookingReportService: BookingReportService) { }

  ngOnInit() {
   
  }
  // check()
  // {
  //   this.apiFormdate = this.datePipe.transform(this.Fromdate, 'MM-dd-yyyy');
  //   this.apiToDate = this.datePipe.transform(this.ToDate, 'MM-dd-yyyy');
  //   console.log(this.apiFormdate);
  //   console.log(this.apiToDate);
  // }
   getBookingDetails()
  {
    this.apiFormdate = this.datePipe.transform(this.Fromdate, 'MM-dd-yyyy');
    // console.log(this.apiFormdate);
    this.apiToDate = this.datePipe.transform(this.ToDate, 'MM-dd-yyyy');
    this.bookingReportService.GetAllBookingDetails(this.apiFormdate, this.apiToDate)
    .subscribe((bookingList: BookingDetailsReport[]) => {
      console.log(bookingList);
      this.bookingDetails = bookingList;
    });
  }
generatePdf()
  {
    this.getBookingDetails();
    setTimeout(() => {
      var ab = {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        content: [
          {
            text: 'Rapid Courier',
            bold: true,
            fontSize: 10,
            alignment: 'center',
            margin: [0, 0, 0, 20]
          },
          { text: 'Booking Details Report', style: 'header' },
          { text: 'From: '+this.apiFormdate+' '+'To: '+this.apiToDate, style: 'header' },
          BookingDetailsRpt.table(this.bookingDetails, ['bookingDate', 'courierBill',
          'deliveredDate','deliveryMan','id','merchantBill','merchantName','receiverBill','receiverName',
        'status','zone'
        ])
        ],
        styles: {
          name: {
            fontSize: 5,
            bold: true
          }
        }
      }
      pdfMake.createPdf(ab).open();
    }, 300);
  }
}
