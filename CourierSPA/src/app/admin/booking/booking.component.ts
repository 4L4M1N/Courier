import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { InvoiceR } from 'src/app/models/reportsFormat/invoiceR';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/Booking/booking.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';
import { DatePipe } from '@angular/common';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  // get value from merchant
  logoUrl = "assets/images/companyIcon.png";
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
  itemPrice: number;
  kala:any;
  conditionCharge: number;
  conditionChargeTemp: number;
  courierBill: number;
  merchantBill: number;
  merchantInfo: any;
  merchantId: any;
  receiverId: any;
  bookingId: any;
  searchBookingId: any;
  searchResult: any;
  isSearch = false;
  showBookingSerial: any;
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
    discount: 0,
    isConditionCharge: false,
    isInCity: false,
    conditionCharge: 0,
    isOutCity: false,
    itemAttributeId: 0,
    itemPrice: 0,
    merchantBill: 0,
    receiverBill: 0,
    courierBill: 0,
    merchantIdentity: '',
    receiverId: '',
    bookingId: '',
    receiverEmail: ''
  };

  // tempItemAttribute: ItemAttribute; // store itemAttributes to table
  // itemAttributeTable: ItemAttribute[] = []; // push all added itemAttributes
  // itemAttributeIDs: any[] = []; // store item attribute id

  addItemAttribute: FormGroup;
  booking: FormGroup;
  submitItemAttribute = false;
  submitBooking = false;
  constructor(private route: ActivatedRoute, private merchentservice: MerchantService,
              private itemcreationservice: ItemcreationService,
              private deliveryAddressservice: DeliveryAddressService,
              private modalService: ModalService,
              private datePipe: DatePipe,
              private bookingService: BookingService) {
    this.itemcreationservice.GetItems().subscribe(data => { this.items = data });
    this.deliveryAddressservice.GetDivisions().subscribe(r => { this.division = r });
  }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        this.merchantId = params.get('merchantId');
        console.log(this.merchantId);
      });
    this.GetMerchantInfo();
    // this.GetBookingSerial();

    // Booking form
    this.booking = new FormGroup({
      receiverName: new FormControl('', Validators.required),
      receiverPhone: new FormControl('', Validators.required),
      receiverAddress: new FormControl('', Validators.required),
      receiverEmail: new FormControl('', Validators.required),
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

        console.log(this.merchantIdentity);
        this.merchantIdentity = this.merchantInfo.merchantIdentity;
        console.log(this.merchantInfo.merchantIdentity);
        this.GetBookingSerial();
      });
  }
  GetBookingSerial() {
    console.log(this.merchantIdentity);
    this.bookingService.GetBookingSerial(this.merchantIdentity).subscribe(data => {
      this.showBookingSerial = data;
      console.log(this.showBookingSerial.showBookingSerial);
    });
  }
  GetDivision()
  {
    this.deliveryAddressservice.GetDivisions().subscribe(r => { this.division = r });
  }
  // division dropdown populate
  onSelectDivision(event) {
    this.booking.controls['itemid'].setValue('');
    this.booking.controls['attributeId'].setValue('');
    this.itemPrice = 0;
    if(this.isSearch)
    {
      this.onItemPriceChange(this.itemPrice);
    }
    let divisionName = event.target['options']
    [event.target['options'].selectedIndex].text;
    console.log(divisionName);
    if (divisionName === 'Dhaka') {
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
    this.GetZonesOnChange(divId);
   
  }
  GetZonesOnChange(divId)
  {
    console.log(divId);
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
    this.GetItemAttributes(itemId);
  }


  get addItemAttributeForm() { return this.addItemAttribute.controls; }
  get bookingForm() { return this.booking.controls; }

  search() {
    this.bookingService.SearchBooking(this.searchBookingId).subscribe(data => {
      this.searchResult = data;
      console.log(this.searchResult);
    }, error => {
    });
    setTimeout(() => {
    if (this.searchResult != null) {
      this.isSearch = true;
      console.log(this.searchResult.bookingItem.id);
      this.booking.controls['itemid'].setValue(this.searchResult.item.itemId);
      this.GetItemAttributes(this.searchResult.item.itemId);
      this.GetItemAttributesOnChange(this.searchResult.bookingItem.itemAttributeId);
      this.booking.controls['divisionid'].setValue(this.searchResult.receiver.zone.divisionId);
      this.GetDivision();
      this.booking.controls['zoneid'].setValue(this.searchResult.receiver.zone.zoneId);
      this.GetZonesOnChange(this.searchResult.receiver.zone.divisionId);
      this.receiverId = this.searchResult.receiver.id;
      this.bookingId = this.searchResult.id;
      this.booking.controls['receiverName'].setValue(this.searchResult.receiver.name);
      this.booking.controls['receiverPhone'].setValue(this.searchResult.receiver.phone);
      this.booking.controls['receiverAddress'].setValue(this.searchResult.receiver.address);
      this.booking.controls['reference'].setValue(this.searchResult.receiver.address);
      this.booking.controls['receiverEmail'].setValue(this.searchResult.receiver.email);
      setTimeout(()=> {this.onItemPriceChange(this.searchResult.itemPrice);
                       this.isConditionChargeApply = this.searchResult.bookingItem.isConditionChargeApply;
                       this.conditionChargeChangeForSearch(this.isConditionChargeApply);
      }, 300);
      this.booking.controls['attributeId'].setValue(this.searchResult.bookingItem.itemAttributeId);
      this.itemPrice = this.searchResult.itemPrice;
      console.log('Item Price'+this.itemPrice);
      this.isInCity = this.searchResult.bookingItem.isInCity;
    } else {
      this.modalService.openErrorModal("No Booking found");
    }
  }, 300);
  }
  addBooking() {
    this.submitBooking = true;
    if (this.booking.invalid) {
      console.log("error");
      return;
    }
    if(this.isSearch)
    {
      this.placeBooking.bookingId = this.bookingId;
      this.placeBooking.receiverId = this.receiverId;
    }
    this.placeBooking.merchantId = this.merchantInfo.id;
    this.placeBooking.receiverName = this.booking.controls['receiverName'].value;
    this.placeBooking.receiverPhone = this.booking.controls['receiverPhone'].value;
    this.placeBooking.receiverAddress = this.booking.controls['receiverAddress'].value;
    this.placeBooking.divisionId = this.booking.controls['divisionid'].value;
    this.placeBooking.zoneId = this.booking.controls['zoneid'].value;
    this.placeBooking.itemAttributeId = this.booking.controls['attributeId'].value;
    this.placeBooking.receiverEmail = this.booking.controls['receiverEmail'].value;
    this.placeBooking.discount = this.discountAmmount;
    this.placeBooking.totalAmount = this.total;
    this.placeBooking.itemPrice = this.itemPrice;
    this.placeBooking.merchantIdentity = this.merchantIdentity;
    this.placeBooking.courierBill = this.courierBill;
    this.placeBooking.merchantBill = this.merchantBill;
    this.placeBooking.receiverBill = this.payableAmount;
    this.placeBooking.conditionCharge = this.conditionCharge;
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
  UpdateBooking()
  {
    
    this.placeBooking.bookingId = this.bookingId;
    this.placeBooking.receiverId = this.receiverId;
    this.placeBooking.merchantId = this.merchantInfo.id;
    this.placeBooking.receiverName = this.booking.controls['receiverName'].value;
    this.placeBooking.receiverPhone = this.booking.controls['receiverPhone'].value;
    this.placeBooking.receiverAddress = this.booking.controls['receiverAddress'].value;
    this.placeBooking.divisionId = this.booking.controls['divisionid'].value;
    this.placeBooking.receiverEmail = this.booking.controls['receiverEmail'].value;
    this.placeBooking.zoneId = this.booking.controls['zoneid'].value;
    this.placeBooking.itemAttributeId = this.booking.controls['attributeId'].value;
    this.placeBooking.discount = this.discountAmmount;
    this.placeBooking.totalAmount = this.total;
    this.placeBooking.itemPrice = this.itemPrice;
    this.placeBooking.merchantIdentity = this.merchantIdentity;
    this.placeBooking.courierBill = this.courierBill;
    this.placeBooking.merchantBill = this.merchantBill;
    this.placeBooking.receiverBill = this.payableAmount;
    this.placeBooking.conditionCharge = this.conditionCharge;
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
    this.bookingService.Update(this.placeBooking).subscribe(() => {
      console.log('created');
      this.modalService.openInfoModal("Booking Updated");
    }, error => {
      this.modalService.openErrorModal("Not updated");
      console.log('error');
    });
  }
  DeleteBooking() {
    this.modalService.openConfirmModal("Are you want to sure delete this booking?",(answer: boolean) => {
      if (answer) {
        console.log(this.bookingId);
        this.bookingService.DeleteBooking(this.bookingId).subscribe(() => {
          this.modalService.openInfoModal("Booking Deleted");
        }, error => {
          console.log(error);
        });
        return;
      }
      console.log('No, I\'m sorry.');
    });
  }
  GetItemAttributes(itemId) {
    if (itemId === 0) {
      this.listItemAttributes == null;
    } else {
      this.itemcreationservice.GetItemAttributesOfAnItemMerchant(itemId, this.merchantId).subscribe(data => {

        this.listItemAttributes = data;
      });
    }
  }
  onSelectItemAttribute(event) {
    let value = event.target.value;
    let itemAttributeId = value;
    console.log(itemAttributeId)
    this.GetItemAttributesOnChange(itemAttributeId);
  }
  GetItemAttributesOnChange(itemAttributeId) {
    if (itemAttributeId === 0) {
      this.itemAttributeDetails == null;
    } else {
      this.itemcreationservice.GetItemAttributeDetails(itemAttributeId).subscribe(data => {
       
        this.itemAttributeDetails = data;
        this.conditionChargeTemp = this.itemAttributeDetails['conditionCharge'];
        console.log(this.isConditionChargeApply);
        //this.isConditionChargeApply = false;
        //this.itemPrice = 0;
        
      },error => {
        console.log('error');
      });
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
    console.log(itemPrice);
    this.conditionCharge = 0;
    this.total = 0;
    this.payableAmount = 0;
    this.courierBill = 0;
    this.merchantBill = 0;
    this.itemPrice = parseFloat(itemPrice);
    if (this.isInCity) {
      this.bookingAndDelivCharge = (this.itemAttributeDetails.inCityRate+ this.itemAttributeDetails.bookingCharge);
      this.total = this.total + (this.itemAttributeDetails.inCityRate + this.itemAttributeDetails.bookingCharge);
      this.payableAmount = this.total;
      this.courierBill = this.bookingAndDelivCharge;
      this.merchantBill = this.itemPrice;
      console.log(this.merchantBill);
    } else {
      this.bookingAndDelivCharge = this.itemAttributeDetails.outCityRate+ this.itemAttributeDetails.bookingCharge;
      this.total = this.total + this.itemAttributeDetails.outCityRate + this.itemAttributeDetails.bookingCharge;
      this.payableAmount = this.total;
      this.courierBill = this.bookingAndDelivCharge;
      this.merchantBill = this.itemPrice;
      console.log(this.merchantBill);
    }

    console.log(this.total);
    this.total = this.total + this.itemPrice;
    this.payableAmount = this.total;
    this.tempTotal = this.total;
    this.conditionCharge = (this.itemPrice * this.conditionChargeTemp) / 100;
    if (this.isConditionChargeApply == true) {
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
  conditionChargeChangeForSearch(isChanged: any) {
    if (isChanged && this.conditionCharge !== 0 && this.itemPrice !== 0) {
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
  conditionChargeChange(isChanged: any) {
    if (isChanged.checked && this.conditionCharge !== 0 && this.itemPrice !== 0) {
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
    this.invoice.receiverBill = this.payableAmount;
    console.log(this.invoice);

    var documentDefinition = this.getDocumentDefinition();
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
            widths: ['*', 'auto', 100, '*'],
            body: [
              ['Description', 'Date', 'Discount', 'Total'],
              ['Test', this.datePipe.transform(new Date(), 'yyyy-MM-dd'), this.invoice.discount, this.invoice.total]
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
  // getProfilePicObject() {
  //   if (this.logoUrl) {
  //     return {
  //       image: '',
  //       width: 75,
  //       alignment: 'right'
  //     };
  //   }
  //   return null;
  // }
  // getBase64ImageFromURL(url) {
  //   return new Promise((resolve, reject) => {
  //     var img = new Image();
  //     img.setAttribute("crossOrigin", "anonymous");
  //     img.onload = () => {
  //       var canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       var ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);
  //       var dataURL = canvas.toDataURL("image/png");
  //       resolve(dataURL);
  //     };
  //     img.onerror = error => {
  //       reject(error);
  //     };
  //     img.src = url;
  //   });
  // }
  openInfoModal() {
    this.modalService.openInfoModal('Booking added');
  }
}
