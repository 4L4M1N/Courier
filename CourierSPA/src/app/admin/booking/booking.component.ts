import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Merchants } from 'src/app/models/Merchants';
import { MerchantService } from 'src/app/services/Merchant.service';
import { Iitem } from 'src/app/models/Iitem';
import { ItemAttribute } from 'src/app/models/ItemAttribute';
import { ItemcreationService } from 'src/app/services/itemcreation.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  merchantInfo: any;
  merchantId: any;
  items: Iitem[];
  itemAttributeDetails: ItemAttribute;
  listItemAttributes: ItemAttribute[];
  constructor(private route: ActivatedRoute, private merchentservice: MerchantService,
              private itemcreationservice: ItemcreationService ) { 
                this.itemcreationservice.GetItems().subscribe(data => { this.items = data});
                
              }

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
  onSelect(event)
  {
    let value = event.target.value;
    let itemId = value;
    console.log(itemId);
    if(itemId == 0) {
      this.listItemAttributes == null;
    } else {
      this.itemcreationservice.GetItemAttributesOfAnItem(itemId).subscribe(data => {
        this.listItemAttributes = data;
      });
    }
  }
  onSelectItemAttribute(event)
  {
    let value = event.target.value;
    let itemAttributeId = value;
    console.log(itemAttributeId)
    if(itemAttributeId == 0) {
      this.itemAttributeDetails == null;
    } else {
      this.itemcreationservice.GetItemAttributeDetails(itemAttributeId).subscribe(data => {
        this.itemAttributeDetails = data;
      })
    }
  }
  a() {
    console.log('ok');
  }

}
