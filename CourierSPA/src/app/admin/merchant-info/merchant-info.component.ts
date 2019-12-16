import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { MerchantService } from 'src/app/services/Merchant.service';

@Component({
  selector: 'app-merchant-info',
  templateUrl: './merchant-info.component.html',
  styleUrls: ['./merchant-info.component.css']
})
export class MerchantInfoComponent implements OnInit {
  merchantId: string;
  merchantInfo: any;
  constructor(private route: ActivatedRoute, private merchentservice: MerchantService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.merchantId = params.get('merchantId');
      console.log(this.merchantId);
    });
    this.GetMerchantInfo();
  }
  GetMerchantInfo() {
    this.merchentservice.GetMerchant(this.merchantId)
      .subscribe(data => {
        this.merchantInfo = data;
        console.log(this.merchantInfo);
      });
  }
  

}
