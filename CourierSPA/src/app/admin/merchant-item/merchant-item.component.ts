import { ItemAttribute } from './../../models/ItemAttribute';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { ModalService } from 'src/app/services/Dialog/modal.service';
import { ActivatedRoute } from '@angular/router';
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
  submitted = false;
  editOutCity: any;
  ItemAttributeid: any;
  isModify = false;
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
      itemid: new FormControl('', [Validators.required]),
      ItemSize: new FormControl('', [Validators.required]),
      InCityRate: new FormControl('' , [Validators.required]),
      OutCityRate: new FormControl('', [Validators.required]),
      RegularRate: new FormControl('', [Validators.required]),
      ConditionCharge: new FormControl('', [Validators.required]),
      BookingCharge: new FormControl('', [Validators.required])
    });
  }
  get itemAttributeADDForm() {return this.ItemAttributeForm.controls;}
  // Create Item attribute or type
  CreateItemAttribute() {
    this.submitted = true;
    if (this.ItemAttributeForm.invalid)
    {
      return ;
    }
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
    this.isModify =  true;
    console.log(itemAttribute);
    this.ItemAttributeid = itemAttribute.itemAttributeId;
    console.log(this.ItemAttributeid);
    this.editOutCity = itemAttribute.outCityRate;
    this.ItemAttributeForm.controls['ItemSize'].setValue(itemAttribute.itemSize);
    this.ItemAttributeForm.controls['OutCityRate'].setValue(itemAttribute.outCityRate);
    this.ItemAttributeForm.controls['InCityRate'].setValue(itemAttribute.inCityRate);
    this.ItemAttributeForm.controls['RegularRate'].setValue(itemAttribute.regularRate);
    this.ItemAttributeForm.controls['ConditionCharge'].setValue(itemAttribute.conditionCharge);
    this.ItemAttributeForm.controls['BookingCharge'].setValue(itemAttribute.bookingCharge);
    console.log(this.editOutCity);
  }
  UpdateItemAttribute() {
    if (this.ItemAttributeForm.valid) {
      console.log(this.ItemAttributeForm.value);
      this.itemAttribute = Object.assign({}, this.ItemAttributeForm.value);
      this.itemAttribute.itemAttributeId = this.ItemAttributeid;
      this.itemAttribute.merchantId = this.merchantId;
      console.log(this.itemAttribute);
      this.itemcreationservice.UpdateItemAttribute(this.itemAttribute).subscribe(() => {
        console.log('ok');
        this.openUpdateModal();
      }, error => {
        console.log('error');
        this.openErrorModal();
      });
    }
  }
  getitems() {
    this.itemcreationservice.GetItems().subscribe(r => this.item = r);
  }
  openInfoModal() {
    this.modalService.openInfoModal('Added');
  }
  openUpdateModal() {
    this.modalService.openInfoModal('Updated');
  }
  openErrorModal() {
    this.modalService.openErrorModal('Error');
  }


}

