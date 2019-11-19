import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { ItemAttribute } from 'src/app/models/ItemAttribute';
import { Iitem } from 'src/app/models/Iitem';

@Component({
  selector: 'app-itemcreation',
  templateUrl: './itemcreation.component.html',
  styleUrls: ['./itemcreation.component.css']
})
export class ItemcreationComponent implements OnInit {

  item: Iitem[];
  itemAttribute: ItemAttribute;
  listItemAttributes: ItemAttribute[];
  itemAttributesOfAnItem: ItemAttribute[];
  createItemFrom: FormGroup;
  ItemAttributeForm: FormGroup;
  p: number = 1;
  constructor(private itemcreationservice: ItemcreationService) { }

  ngOnInit() {
    this.getitems();

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

    this.createItemFrom = new FormGroup({
      itemName: new FormControl(''),
    });
  }
  CreateItem() {
    if (this.createItemFrom.valid) {
      const formData = new FormData();
      const itemName = this.createItemFrom.controls['itemName'].value;
      formData.append('itemName', itemName);
      this.itemcreationservice.CreateItem(formData).subscribe(() => {
        console.log('created');
      }, error => {
        console.log('error');
      });
  }}

  CreateItemAttribute() {
    if (this.ItemAttributeForm.valid) {
      console.log(this.ItemAttributeForm.value);
      this.itemAttribute = Object.assign({}, this.ItemAttributeForm.value);
      console.log(this.itemAttribute);
      this.itemcreationservice.CreateItemAttribute(this.itemAttribute).subscribe(() => {
        console.log('ok');
      }, error => {
        console.log('error');
      });
  }}
  getitems() {
    this.itemcreationservice.GetItems().subscribe(r => this.item = r);
  }
  onSelect(event)
  {
    let value = event.target.value;
    let itemId = value;
    console.log(itemId);
    if(itemId == 0) 
    { this.itemAttributesOfAnItem == null; 
    } else {
      this.itemcreationservice.GetItemAttributesOfAnItem(itemId).subscribe(data => {this.itemAttributesOfAnItem = data});
    }
    
  }
  loadAllItemAttribtes() {
    this.itemcreationservice.GetAllItemAttribute().subscribe((listItemAttributes: ItemAttribute[]) => {
      this.listItemAttributes = listItemAttributes;
    }, error => {
      console.log('error');
    });
    }
}
