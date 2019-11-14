import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { ItemAttribute } from 'src/app/models/ItemAttribute';

@Component({
  selector: 'app-itemcreation',
  templateUrl: './itemcreation.component.html',
  styleUrls: ['./itemcreation.component.css']
})
export class ItemcreationComponent implements OnInit {

  itemAttributeCreate: ItemAttribute;
  createItemFrom: FormGroup;
  ItemAttributeForm: FormGroup;
  constructor(private itemcreationservice: ItemcreationService) { }

  ngOnInit() {
    this.ItemAttributeForm = new FormGroup({

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
    console.log('ok');
  }
}
