import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { MerchantService } from 'src/app/services/Merchant.service';
import { IMerchants } from 'src/app/models/IMerchants';

@Component({
  selector: 'app-merchant-agreement',
  templateUrl: './merchant-agreement.component.html',
  styleUrls: ['./merchant-agreement.component.css']
})
export class MerchantAgreementComponent implements OnInit {

  merchantId: any;
  isReadOnly = true;
  merchantInfo: any;
  itemAttributeList: any;
  constructor(private route: ActivatedRoute,
              private itemcreationservice: ItemcreationService,
              private merchantService: MerchantService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.merchantId = params.get('merchantId');
      console.log(this.merchantId);
    });
    this.GetMerchantInfo();
    this.GetMerchantItemAttribute();
  }
  GetMerchantInfo() {
    this.merchantService.GetMerchant(this.merchantId)
    .subscribe(data => {
      this.merchantInfo = data;
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

}
