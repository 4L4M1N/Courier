import { Component, OnInit } from '@angular/core';
import { Merchants } from '../../models/Merchants';
import { FormGroup, FormControl } from '@angular/forms';
import { MerchantService } from '../../services/Merchant.service';

@Component({
  selector: 'app-merchentadd',
  templateUrl: './merchentadd.component.html',
  styleUrls: ['./merchentadd.component.css']
})
export class MerchentaddComponent implements OnInit {

  merchant: Merchants;
  merchantaddForm: FormGroup;
  constructor(private merchentservice: MerchantService) { }

  ngOnInit() {
    this.merchantaddForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      bankAccountNo: new FormControl(''),
      password: new FormControl(''),
      tradeLicenseNo: new FormControl(''),
      });
  }
  Create() {
    if (this.merchantaddForm.valid) {
      this.merchant = Object.assign({}, this.merchantaddForm.value);

      this.merchentservice.Create(this.merchant).subscribe(() => {
        console.log('created');
      }, error => {
        console.log('error');
      });
  }}

}
