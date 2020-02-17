import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material';
import { DatePipe } from '@angular/common';

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
  
  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
  }
  check()
  {
    
    this.apiFormdate = this.datePipe.transform(this.Fromdate, 'MM-dd-yyyy');
    this.apiToDate = this.datePipe.transform(this.ToDate, 'MM-dd-yyyy');
    console.log(this.apiFormdate);
    console.log(this.apiToDate);
  }

}
