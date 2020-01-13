import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemcreationService } from 'src/app/services/itemcreation.service';

@Component({
  selector: 'app-merchant-agreement',
  templateUrl: './merchant-agreement.component.html',
  styleUrls: ['./merchant-agreement.component.css']
})
export class MerchantAgreementComponent implements OnInit {

  merchantId: any;
  itemAttributeList: any;
  constructor(private route: ActivatedRoute,  private itemcreationservice: ItemcreationService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.merchantId = params.get('merchantId');
      console.log(this.merchantId);
    });
    this.GetMerchantItemAttribute();
  }
  GetMerchantItemAttribute() {
    this.itemcreationservice.GetItemAttributeWithItem(this.merchantId)
    .subscribe(data => {
      this.itemAttributeList = data;
    });
  }

}
