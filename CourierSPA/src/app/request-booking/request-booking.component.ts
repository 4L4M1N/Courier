import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestBookingService } from '../services/Booking/request-booking.service';
import { ModalService } from '../services/Dialog/modal.service';

@Component({
  selector: 'app-request-booking',
  templateUrl: './request-booking.component.html',
  styleUrls: ['./request-booking.component.css']
})
export class RequestBookingComponent implements OnInit {

  bookingRequestForm: FormGroup;
  submitted = false;
  model: any = {};
  constructor(private requestBookingService: RequestBookingService,private modalService: ModalService) { }

  ngOnInit() {
    this.bookingRequestForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      bookingItems: new FormControl('', Validators.required)
    });
  }
  get f() { return this.bookingRequestForm.controls; }
  submitBooking() {
    this.submitted = true;
    if(this.bookingRequestForm.invalid)
    {
      return;
    }
    const name = this.bookingRequestForm.controls['name'].value;
    const phone = this.bookingRequestForm.controls['phone'].value;
    const email = this.bookingRequestForm.controls['email'].value;
    const bookingItems = this.bookingRequestForm.controls['bookingItems'].value;
    this.model.name = name;
    this.model.phone = phone;
    this.model.email = email;
    this.model.bookingItems = bookingItems;

    this.requestBookingService.Create(this.model).subscribe(() => {
      console.log('created');
      this.openInfoModal();
    }, error => {
      console.log('error');
      this.openErrorModal();
    });
  }
  openInfoModal() {
    this.modalService.openInfoModal('Request Send');
  }
  openErrorModal() {
    this.modalService.openErrorModal('Failled!');
  }
}
