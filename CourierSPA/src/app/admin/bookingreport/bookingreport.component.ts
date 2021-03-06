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
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-bookingreport',
  templateUrl: './bookingreport.component.html',
  styleUrls: ['./bookingreport.component.css']
 
})
export class BookingreportComponent implements OnInit {
  // date = new FormControl(new Date());
  Fromdate = new Date;
  ToDate = new Date;
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
  
generatePdf()
  {
    const a = this.getBookingDetails();
    a.then((data=> {
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
          BookingDetailsRpt.table(data, ['Booking Date', 'Courier Bill',
          'Delivered Date','Delivery Man','ID','Merchant Bill','Merchant Name','Receiver Bill','Receiver Name',
        'Status','Zone'
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
    }))
   
      
  }
  async getBookingDetails()
  {
    this.apiFormdate = this.datePipe.transform(this.Fromdate, 'MM-dd-yyyy');
    // console.log(this.apiFormdate);
    this.apiToDate = this.datePipe.transform(this.ToDate, 'MM-dd-yyyy');
    return await this.bookingReportService.GetAllBookingDetails(this.apiFormdate, this.apiToDate);
    // .subscribe((bookingList: BookingDetailsReport[]) => {

    //   this.bookingDetails = bookingList;
    // });
  }
}
