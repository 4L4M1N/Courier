import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Merchants } from 'src/app/models/Merchants';
import { MerchantService } from 'src/app/services/Merchant.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  merchantInfo: any;
  merchantId: any;
  constructor(private route: ActivatedRoute, private merchentservice: MerchantService ) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.merchantId = params.get('merchantId');
      console.log(this.merchantId);
    });
    this.merchentservice.GetMerchant(this.merchantId)
      .subscribe(data => {
        this.merchantInfo = data;
        console.log(this.merchantInfo);
      });
  }
  a() {
    console.log('ok');
  }

}
