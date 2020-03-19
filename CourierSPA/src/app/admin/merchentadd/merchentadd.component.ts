import { Component, OnInit } from '@angular/core';
import { Merchants } from '../../models/Merchants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MerchantService } from '../../services/Merchant.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';
import {phoneValidator} from 'src/app/validators/custom.validators';  

@Component({
  selector: 'app-merchentadd',
  templateUrl: './merchentadd.component.html',
  styleUrls: ['./merchentadd.component.css']
})
export class MerchentaddComponent implements OnInit {

  merchant: Merchants;
  merchantaddForm: FormGroup;
  submitted = false;
  constructor(private merchentservice: MerchantService, private modalService: ModalService) { }

  ngOnInit() {
    this.merchantaddForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('',[Validators.required,phoneValidator]),
      email: new FormControl('',[Validators.required, Validators.email]),
      address: new FormControl('',Validators.required),
      bankAccountNo: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      tradeLicenseNo: new FormControl('',[Validators.required]),
      });
  }
  get merchantForm() {return this.merchantaddForm.controls;}
  Create() {
    this.submitted = true;
    if(this.merchantaddForm.invalid)
    {
      return ;
    }
      this.merchant = Object.assign({}, this.merchantaddForm.value);

    this.merchentservice.Create(this.merchant).subscribe(() => {
        this.modalService.openInfoModal("Merchant Added");
      }, error => {
        console.log(error);
      });
  }
}
