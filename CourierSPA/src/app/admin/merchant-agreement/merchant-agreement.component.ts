import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { MerchantService } from 'src/app/services/Merchant.service';
import { IMerchants } from 'src/app/models/IMerchants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { phoneValidator } from 'src/app/validators/custom.validators';
import { Merchants } from 'src/app/models/Merchants';
import { ModalService } from 'src/app/services/Dialog/modal.service';

@Component({
  selector: 'app-merchant-agreement',
  templateUrl: './merchant-agreement.component.html',
  styleUrls: ['./merchant-agreement.component.css']
})
export class MerchantAgreementComponent implements OnInit {

  merchantId: any;
  merchant: Merchants;
  isReadOnly = true;
  merchantInfo: any;
  itemAttributeList: any;
  merchantForm: FormGroup;
  submitted = false;
  constructor(private route: ActivatedRoute,
              private itemcreationservice: ItemcreationService,
              private merchantService: MerchantService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.merchantId = params.get('merchantId');
      console.log(this.merchantId);
    });
    this.GetMerchantInfo();
    this.GetMerchantItemAttribute();
    this.merchantForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('',[Validators.required,phoneValidator]),
      // email: new FormControl('',[Validators.required, Validators.email]),
      email: new FormControl('',[Validators.email]),
      // address: new FormControl('',Validators.required),
      address: new FormControl('',),
      bankAccountNo: new FormControl('',Validators.required),
      // password: new FormControl('',[Validators.required,Validators.minLength(8)]),
      // password: new FormControl('',[Validators.minLength(8)]),
      // tradeLicenseNo: new FormControl('',[Validators.required]),
      tradeLicenseNo: new FormControl('',),
      });
  }
  get merchantInformationForm() {return this.merchantForm.controls;}
  GetMerchantInfo() {
    this.merchantService.GetMerchant(this.merchantId)
    .subscribe(data => {
      this.merchantInfo = data;
      this.merchantForm.controls['name'].setValue(this.merchantInfo.name);
      this.merchantForm.controls['phone'].setValue(this.merchantInfo.phone);
      this.merchantForm.controls['email'].setValue(this.merchantInfo.email);
      this.merchantForm.controls['address'].setValue(this.merchantInfo.address);
      this.merchantForm.controls['bankAccountNo'].setValue(this.merchantInfo.bankAccountNo);
      this.merchantForm.controls['tradeLicenseNo'].setValue(this.merchantInfo.tradeLicenseNo);
    });
  }
  GetMerchantItemAttribute() {
    this.itemcreationservice.GetItemAttributeWithItem(this.merchantId)
    .subscribe(data => {
      this.itemAttributeList = data;
    });
  }
  ClickEditMerchantInfo() {
    this.isReadOnly = false;
  }
  Update() {
    this.submitted = true;
    if(this.merchantForm.invalid)
    {
      return ;
    }
    this.merchant = Object.assign({}, this.merchantForm.value);
    this.merchant.id = this.merchantId;
    console.log(this.merchant);
    this.merchantService.Update(this.merchant).subscribe(() => {
      this.modalService.openInfoModal("Merchant Updated");
    }, error => {
      //console.log(error);
      this.modalService.openErrorModal(error);
    });
  }

}
