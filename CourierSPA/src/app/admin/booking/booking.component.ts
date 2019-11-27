import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Merchants } from 'src/app/models/Merchants';
import { MerchantService } from 'src/app/services/Merchant.service';
import { Iitem } from 'src/app/models/Iitem';
import { ItemAttribute } from 'src/app/models/ItemAttribute';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  merchantInfo: any;
  merchantId: any;
  // get all items and populate dropdown
  items: Iitem[];
  // get itemAttributeDetails of an selected item attribute
  itemAttributeDetails: ItemAttribute;
  // get item attributes according to itemId
  listItemAttributes: ItemAttribute[];
  // store itemAttributes to table
  tempItemAttribute:ItemAttribute;
  // push all added itemAttributes
  itemAttributeTable:ItemAttribute[] = [];
  // store item attribute id
  itemAttributeIDs:any[] = [];
  addItemAttribute:FormGroup;
  submitItemAttribute =  false;
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
    this.addItemAttribute = new FormGroup({
      // itemid: new FormControl(''),
      itemid: new FormControl('', Validators.required),
      attributeId: new FormControl('', Validators.required)
    });
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
  get addItemAttributeForm() { return this.addItemAttribute.controls;}
  //Add to table
  addItemAttributeToList()
  {
    this.submitItemAttribute = true;
    if (this.addItemAttribute.invalid) {
      console.log("error");
      return;
  }
    var itemid = this.addItemAttribute.controls['itemid'].value;
    var itemAttributeId = this.addItemAttribute.controls['attributeId'].value;
    this.itemAttributeIDs.push(itemAttributeId);
    this.itemcreationservice.GetItemAttributeDetails(itemAttributeId).subscribe(data => {
      this.tempItemAttribute = data;
      this.itemAttributeTable.push(this.tempItemAttribute);
    })
    console.log(this.itemAttributeIDs);
    console.log(this.itemAttributeTable);
  }
  a() {
    console.log('ok');
  }

}
