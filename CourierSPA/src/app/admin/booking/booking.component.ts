import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Merchants } from 'src/app/models/Merchants';
import { MerchantService } from 'src/app/services/Merchant.service';
import { Iitem } from 'src/app/models/Iitem';
import { ItemAttribute } from 'src/app/models/ItemAttribute';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Division } from 'src/app/models/division';
import { Zone } from 'src/app/models/zone';
import { DeliveryAddressService } from 'src/app/services/deliveryAddress.service';
import { MessagesService } from 'src/app/services/Messages.service';
import { MatDialogRef } from '@angular/material';
import { ConfirmService } from 'src/app/services/Confirm.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  division: Division[]; // get all divisions and populate dropdown
  listZones: Zone[];

  merchantInfo: any;
  merchantId: any;
  // get all items and populate dropdown
  items: Iitem[];
  // get itemAttributeDetails of an selected item attribute
  itemAttributeDetails: ItemAttribute;
  // get item attributes according to itemId
  listItemAttributes: ItemAttribute[];
  // store itemAttributes to table
  tempItemAttribute: ItemAttribute;
  // push all added itemAttributes
  itemAttributeTable: ItemAttribute[] = [];
  // store item attribute id
  itemAttributeIDs: any[] = [];
  addItemAttribute: FormGroup;
  booking: FormGroup;
  submitItemAttribute =  false;
  submitBooking = false;
  constructor(private route: ActivatedRoute, private merchentservice: MerchantService,
              private itemcreationservice: ItemcreationService,
              private deliveryAddressservice: DeliveryAddressService,
              public dialogRef: MatDialogRef<BookingComponent>,
              private messagesService: MessagesService,
              private confirmService: ConfirmService) {
                this.itemcreationservice.GetItems().subscribe(data => { this.items = data});
                this.deliveryAddressservice.GetDivisions().subscribe(r => {this.division = r});
              }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.merchantId = params.get('merchantId');
      console.log(this.merchantId);
    });
    this.GetMerchantInfo();

    // Booking form 
    this.booking = new FormGroup({
      merchantIdentity: new FormControl(),
      merchantName: new FormControl(),
      merchantPhone: new FormControl(),
      merchantEmail: new FormControl(),
      receiverName: new FormControl('', Validators.required),
      receiverPhone: new FormControl('', Validators.required),
      receiverAddress: new FormControl('', Validators.required),
      divisionid: new FormControl('', Validators.required),
      zoneid: new FormControl('', Validators.required)
    });
    // Item Form
    this.addItemAttribute = new FormGroup({
      // itemid: new FormControl(''),
      itemid: new FormControl('', Validators.required),
      attributeId: new FormControl('', Validators.required)
    });

  }
  // Get merchant info
  GetMerchantInfo() {
    this.merchentservice.GetMerchant(this.merchantId)
    .subscribe(data => {
      this.merchantInfo = data;
      console.log(this.merchantInfo);
    });
  }
  // division dropdown populate
  onSelectDivision(event) {
    let value = event.target.value;
    let divId = value;
    //console.log(divId);
    if (divId === 0) {
      this.listZones == null;
    } else {
      this.deliveryAddressservice.GetZonesOfADivison(divId).subscribe(data => {
        this.listZones = data;
      });
    }
  }


  onSelect(event) {
    let value = event.target.value;
    let itemId = value;
    console.log(itemId);
    if (itemId === 0) {
      this.listItemAttributes == null;
    } else {
      this.itemcreationservice.GetItemAttributesOfAnItem(itemId).subscribe(data => {
        this.listItemAttributes = data;
      });
    }
  }
  onSelectItemAttribute(event) {
    let value = event.target.value;
    let itemAttributeId = value;
    console.log(itemAttributeId)
    if(itemAttributeId === 0) {
      this.itemAttributeDetails == null;
    } else {
      this.itemcreationservice.GetItemAttributeDetails(itemAttributeId).subscribe(data => {
        this.itemAttributeDetails = data;
      })
    }
  }
  get addItemAttributeForm() { return this.addItemAttribute.controls; }
  get bookingForm() { return this.booking.controls; }
  
  //Add to table
  addItemAttributeToList() {
    let a = this.confirmService.confirmDialog();
    console.log(a);
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
    });
    console.log(this.itemAttributeIDs);
    console.log(this.itemAttributeTable);
  }

  addBooking() {
    this.submitBooking = true;
    if (this.booking.invalid) {
      console.log("error");
      this.handleError(this.booking.errors);
      return;
  }
  }


  // Messages
  private success() {
    this.messagesService.openDialog('Success', 'Database updated as you wished!');
  }

  private handleError(error) {
    this.messagesService.openDialog('Error', 'Please fill up all field');
  }


}
