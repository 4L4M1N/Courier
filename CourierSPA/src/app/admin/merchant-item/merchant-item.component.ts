import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';
import { ActivatedRoute } from '@angular/router';
import { ItemAttribute } from 'src/app/models/ItemAttribute';
import { Iitem } from 'src/app/models/Iitem';

@Component({
  selector: 'app-merchant-item',
  templateUrl: './merchant-item.component.html',
  styleUrls: ['./merchant-item.component.css']
})
export class MerchantItemComponent implements OnInit {

  item: Iitem[];
  merchantId: any;
  itemAttribute: ItemAttribute;
  listItemAttributes: ItemAttribute[];
  itemAttributesOfAnItem;
  createItemFrom: FormGroup;
  ItemAttributeForm: FormGroup;
  p: number = 1;
  editOutCity: any;
  constructor(private itemcreationservice: ItemcreationService, private route: ActivatedRoute,
              private modalService: ModalService) { }

  ngOnInit() {
    this.route.paramMap
    .subscribe(params => {
      this.merchantId = params.get('merchantId');
      console.log(this.merchantId);
    });
    this.getitems();
    // Item Attribute or Type
    this.ItemAttributeForm = new FormGroup({
      itemid: new FormControl(''),
      ItemSize: new FormControl(''),
      InCityRate: new FormControl(''),
      OutCityRate: new FormControl(''),
      RegularRate: new FormControl(''),
      ConditionCharge: new FormControl(''),
      BookingCharge: new FormControl(''),
      Discount: new FormControl(''),
    });
  }
  // Create Item attribute or type
  CreateItemAttribute() {
    if (this.ItemAttributeForm.valid) {
      console.log(this.ItemAttributeForm.value);
      this.itemAttribute = Object.assign({}, this.ItemAttributeForm.value);
      this.itemAttribute.merchantId = this.merchantId;
      console.log(this.itemAttribute);
      this.itemcreationservice.CreateItemAttribute(this.itemAttribute).subscribe(() => {
        console.log('ok');
        this.openInfoModal();
      }, error => {
        console.log('error');
        this.openErrorModal();
      });
  }}
  onSelect(event) {
    let value = event.target.value;
    let itemId = value;
    console.log(itemId);
    if (itemId === 0) {
      this.itemAttributesOfAnItem == null;
    } else {
      // this.itemcreationservice.GetItemAttributesOfAnItem(itemId).subscribe(data => {this.itemAttributesOfAnItem = data});
      this.itemAttributesOfAnItem = this.itemcreationservice.GetItemAttributesOfAnItemMerchant(itemId, this.merchantId);
    }
  }
  loadAllItemAttribtes() {
    this.itemcreationservice.GetAllItemAttribute().subscribe((listItemAttributes: ItemAttribute[]) => {
      this.listItemAttributes = listItemAttributes;
    }, error => {
      console.log('error');
    });
  }
  onTypeClick(itemAttribute) {
    console.log(itemAttribute);
    this.editOutCity = itemAttribute.outCityRate;
    this.ItemAttributeForm.controls['ItemSize'].setValue(itemAttribute.itemSize);
    this.ItemAttributeForm.controls['OutCityRate'].setValue(itemAttribute.outCityRate);
    this.ItemAttributeForm.controls['InCityRate'].setValue(itemAttribute.inCityRate);
    this.ItemAttributeForm.controls['RegularRate'].setValue(itemAttribute.regularRate);
    this.ItemAttributeForm.controls['ConditionCharge'].setValue(itemAttribute.conditionCharge);
    this.ItemAttributeForm.controls['BookingCharge'].setValue(itemAttribute.bookingCharge);
    this.ItemAttributeForm.controls['Discount'].setValue(itemAttribute.discount);
    console.log(this.editOutCity);
  }
  getitems() {
    this.itemcreationservice.GetItems().subscribe(r => this.item = r);
  }
  openInfoModal() {
    this.modalService.openInfoModal('Added');
  }
  openErrorModal() {
    this.modalService.openErrorModal('Error');
  }

}

