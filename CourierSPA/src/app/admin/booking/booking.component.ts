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
import { MatDialogRef } from '@angular/material';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { InvoiceR } from 'src/app/models/reports/invoiceR';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/Booking/booking.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  // get value from merchant
  merchantIdentity: any;
  merchantPhone: string;
  merchantEmail = '';
  merchantName = '';
  invoice = new InvoiceR(); // invoice object
  division: Division[]; // get all divisions and populate dropdown
  listZones: Zone[];
  discountAmmount = 0;
  total: number;
  payableAmount = 0;
  tempTotal: number;
  bookingAndDelivCharge: number;
  discount = 0;
  itemPrice:number;
  conditionCharge: number;
  conditionChargeTemp: number;
  courierBill: number;
  merchantBill: number;
  merchantInfo: any;
  merchantId: any;
  isAddWithMainBill = false; // Add with main Bill
  isConditionChargeApply = false;    // Condition Charge
  isInCity = false; // InCity/OutCity
  // get all items and populate dropdown
  items: Iitem[];
  // get itemAttributeDetails of an selected item attribute
  itemAttributeDetails: ItemAttribute;
  // get item attributes according to itemId
  listItemAttributes: ItemAttribute[];
  // Booking data
  placeBooking: Booking = {
    merchantId: '',
    receiverName: '',
    receiverPhone: '',
    receiverAddress: '',
    divisionId: 0,
    zoneId: 0,
    totalAmount: 0,
    discount:0,
    isConditionCharge: false,
    isInCity: false,
    conditionCharge: 0,
    isOutCity: false,
    itemAttributeId: 0,
    itemPrice: 0
  };

  // tempItemAttribute: ItemAttribute; // store itemAttributes to table
  // itemAttributeTable: ItemAttribute[] = []; // push all added itemAttributes
  // itemAttributeIDs: any[] = []; // store item attribute id

  addItemAttribute: FormGroup;
  booking: FormGroup;
  submitItemAttribute =  false;
  submitBooking = false;
  constructor(private route: ActivatedRoute, private merchentservice: MerchantService,
              private itemcreationservice: ItemcreationService,
              private deliveryAddressservice: DeliveryAddressService,
              private modalService: ModalService,
              private bookingService: BookingService) {
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
      receiverName: new FormControl('', Validators.required),
      receiverPhone: new FormControl('', Validators.required),
      receiverAddress: new FormControl('', Validators.required),
      divisionid: new FormControl('', Validators.required),
      zoneid: new FormControl('', Validators.required),
      itemid: new FormControl('', Validators.required),
      attributeId: new FormControl('', Validators.required),
      reference: new FormControl('')
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
    this.booking.controls['itemid'].setValue('');
    this.booking.controls['attributeId'].setValue('');
    // this.itemAttributeDetails.bookingCharge = 0;
    // this.itemAttributeDetails.conditionCharge = 0;
    // this.itemAttributeDetails.inCityRate = 0;
    // this.itemAttributeDetails.outCityRate = 0;
    // this.itemAttributeDetails.itemSize = '';
    this.itemPrice = 0;
    
    let divisionName = event.target['options']
                      [event.target['options'].selectedIndex].text;
                      console.log(divisionName);
    if(divisionName === 'Dhaka') {
      this.isInCity = true;
      console.log(this.isInCity);
    } else {
      
      this.isInCity = false;
      console.log(this.isInCity);
    }
    console.log(divisionName);
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
      this.itemcreationservice.GetItemAttributesOfAnItemMerchant(itemId,this.merchantId).subscribe(data => {
        
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
        this.conditionChargeTemp = this.itemAttributeDetails['conditionCharge'];
        console.log(this.conditionCharge);
         // this.total = 0;
         this.isConditionChargeApply = false;
         this.itemPrice = 0;
        // if (this.isInCity) {
        //   this.total = this.total + this.itemAttributeDetails['inCityRate'] + this.itemAttributeDetails['bookingCharge'];
        //  } else {
        //   this.total = this.total + this.itemAttributeDetails['outCityRate'] + this.itemAttributeDetails['bookingCharge'];
        //  }
        // this.tempTotal = this.total;
        // console.log(this.total);
      })
    }
  }
  onSearchChange(searchValue: string): void { 
    console.log(searchValue);
    // this.total = this.tempTotal;
    console.log(this.total);
    this.total = this.total - (+searchValue);
    console.log(this.total);
  }
  onItemPriceChange(itemPrice: any): void {
    this.conditionCharge = 0;
    this.total = 0;
    this.payableAmount = 0;
    this.courierBill = 0;
    this.merchantBill = 0;
    this.itemPrice = parseFloat(itemPrice);
    if (this.isInCity) {
      this.bookingAndDelivCharge = (this.itemAttributeDetails['inCityRate'] + this.itemAttributeDetails['bookingCharge']);
      this.total = this.total + (this.itemAttributeDetails['inCityRate'] + this.itemAttributeDetails['bookingCharge']);
      this.payableAmount = this.total;
      this.courierBill = this.bookingAndDelivCharge;
      this.merchantBill = this.itemPrice;
      console.log(this.merchantBill);
    } else {
      this.bookingAndDelivCharge = this.itemAttributeDetails['outCityRate'] + this.itemAttributeDetails['bookingCharge'];
      this.total = this.total + this.itemAttributeDetails['outCityRate'] + this.itemAttributeDetails['bookingCharge'];
      this.payableAmount = this.total;
      this.courierBill = this.bookingAndDelivCharge;
      this.merchantBill = this.itemPrice;
      console.log(this.merchantBill);
    }
    
    console.log(this.total);
    this.total = this.total + this.itemPrice;
    this.payableAmount = this.total;
    this.tempTotal = this.total;
    this.conditionCharge =  (this.itemPrice * this.conditionChargeTemp) / 100;
    if(this.isConditionChargeApply == true) {
      this.total = 0;
      if (this.isInCity) {
        this.bookingAndDelivCharge = (this.itemAttributeDetails['inCityRate'] + this.itemAttributeDetails['bookingCharge']);
        this.total = this.total + this.itemAttributeDetails['inCityRate'] + this.itemAttributeDetails['bookingCharge'];
       this.payableAmount = this.total;
       this.courierBill = this.bookingAndDelivCharge;
      
      } else {
        this.bookingAndDelivCharge = this.itemAttributeDetails['outCityRate'] + this.itemAttributeDetails['bookingCharge'];
        this.total = this.total + this.itemAttributeDetails['outCityRate'] + this.itemAttributeDetails['bookingCharge'];
        this.payableAmount = this.total;
        this.courierBill = this.bookingAndDelivCharge;
      }
      this.tempTotal = this.total;
      console.log(this.total);
      this.bookingAndDelivCharge = this.bookingAndDelivCharge + this.conditionCharge;
      this.total = this.tempTotal + this.conditionCharge;
      this.payableAmount = this.total;
      this.courierBill = this.bookingAndDelivCharge;
    }
  }
  conditionChargeChange(isChanged:any) {
    if(isChanged.checked && this.conditionCharge !== 0 && this.itemPrice !== 0) 
    {
      // if(this.isAddWithMainBill == true) {this.isAddWithMainBill = false;}
      this.total = 0;
      this.payableAmount = 0;
      this.courierBill = 0;
      this.total = this.tempTotal + this.conditionCharge;
      this.courierBill = this.bookingAndDelivCharge + this.conditionCharge;
      this.payableAmount = this.total;
    } else {
     
      this.total = this.tempTotal;
      this.payableAmount = this.total;
      this.courierBill = this.bookingAndDelivCharge;

      console.log(this.total);
    }
    console.log(isChanged.checked);
  }
  // addWithMainBill(isAdd: any)
  // {
  //   if (isAdd.checked && this.conditionCharge !== 0 && this.itemPrice !== 0)
  //   {
  //     this.payableAmount = 0;
  //     console.log(this.total);
  //     if(this.isConditionChargeApply)
  //     {
  //       this.payableAmount = this.total - this.bookingAndDelivCharge - this.conditionCharge;
  //     } else {
  //       this.payableAmount = this.total - this.bookingAndDelivCharge;
  //     }
      
  //   } else {
  //     this.payableAmount = this.total;
  //   }
  // }

  get addItemAttributeForm() { return this.addItemAttribute.controls; }
  get bookingForm() { return this.booking.controls; }
  
  //Add to table
  // addItemAttributeToList() {
  //   console.log(this.isConditionChargeApply);
  //   this.submitItemAttribute = true;
  //   if (this.addItemAttribute.invalid) {
  //     console.log("error");
  //     return;
  // }
  //   var itemid = this.addItemAttribute.controls['itemid'].value;
  //   var itemAttributeId = this.addItemAttribute.controls['attributeId'].value;
  //   this.itemAttributeIDs.push(itemAttributeId);
  //   this.itemcreationservice.GetItemAttributeDetails(itemAttributeId).subscribe(data => {
  //     this.tempItemAttribute = data;
  //     this.itemAttributeTable.push(this.tempItemAttribute);
  //   });
  //   console.log(this.itemAttributeIDs);
  //   console.log(this.itemAttributeTable);
  // }

  addBooking() {
    this.submitBooking = true;
    if (this.booking.invalid) {
      console.log("error");
      return;
    }
    
    this.placeBooking.merchantId = this.merchantInfo.id;
    this.placeBooking.receiverName = this.booking.controls['receiverName'].value;
    this.placeBooking.receiverPhone = this.booking.controls['receiverPhone'].value;
    this.placeBooking.receiverAddress = this.booking.controls['receiverAddress'].value;
    this.placeBooking.divisionId = this.booking.controls['divisionid'].value;
    this.placeBooking.zoneId = this.booking.controls['zoneid'].value;
    this.placeBooking.itemAttributeId = this.booking.controls['attributeId'].value;
    this.placeBooking.discount = this.discountAmmount;
    this.placeBooking.totalAmount = this.total;
    this.placeBooking.itemPrice = this.itemPrice;
    // Condition Charge
    if (this.isConditionChargeApply) {
      this.placeBooking.isConditionCharge = true;
      this.placeBooking.conditionCharge = this.conditionCharge;
      console.log(this.conditionCharge);
    } else {
      this.placeBooking.isConditionCharge = false;
      this.placeBooking.conditionCharge = 0;
    }
    // inCity OutCity

    if (this.isInCity) {
      this.placeBooking.isInCity = true;
      this.placeBooking.isOutCity = false;
    } else {
      this.placeBooking.isInCity = false;
      this.placeBooking.isOutCity = true;
    }
    console.log(this.placeBooking);
    this.bookingService.Create(this.placeBooking).subscribe(() => {
      console.log('created');
      this.openInfoModal();
    }, error => {
      console.log('error');
    });

  }
  
  generatePdf() {
    console.log(this.merchantName);
    this.invoice.merchantName = this.merchantInfo.name;
    this.invoice.merchantPhone = this.merchantInfo.phone;
    this.invoice.merchantEmail = this.merchantInfo.email;
    this.invoice.receiverName = this.booking.controls['receiverName'].value;
    this.invoice.receiverPhone = this.booking.controls['receiverPhone'].value;
    this.invoice.reciverAddress = this.booking.controls['receiverAddress'].value;
    this.invoice.discount = this.discountAmmount;
    this.invoice.total = this.total;
    console.log(this.invoice);

    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).open();
   }

   // set data for pdf
   getDocumentDefinition() {
    sessionStorage.setItem('resume', JSON.stringify(this.invoice));
    return {
      pageSize: 'A4',
      content: [
        {
          text: 'Rapid Courier',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.invoice.merchantName,
              style: 'name'
            },
            {
              text: this.invoice.merchantPhone
            },
            {
              text: 'Email : ' + this.invoice.merchantEmail + '\n\n',
            }
            ]
          ]
        },
        {
          columns: [
            [
              {
                text: 'Receiver Info'
              },
              {
              text: this.invoice.receiverName,
              style: 'name'
            },
            {
              text: this.invoice.receiverPhone
            },
            {
              text: 'Address : ' + this.invoice.reciverAddress + '\n\n',
            }
            ]
          ]
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],
            body: [
              [ 'Description', 'Date', 'Discount', 'Total' ],
              [ 'Test', '10/10/19', this.invoice.discount, this.invoice.total ]
            ]
          }
        }
      ],
        styles: {
          name: {
            fontSize: 10,
            bold: true
          }
        }
    };
   }

   openInfoModal() {
    this.modalService.openInfoModal('Booking added');
  }
}
