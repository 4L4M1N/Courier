import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-merchant-agreement',
  templateUrl: './merchant-agreement.component.html',
  styleUrls: ['./merchant-agreement.component.css']
})
export class MerchantAgreementComponent implements OnInit {

  merchantId: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.merchantId = params.get('merchantId');
      console.log(this.merchantId);
    });
  }

}
