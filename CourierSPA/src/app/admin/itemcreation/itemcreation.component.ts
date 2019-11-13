import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemcreationService } from 'src/app/services/itemcreation.service';
import { ItemCreation } from 'src/app/models/ItemCreation';

@Component({
  selector: 'app-itemcreation',
  templateUrl: './itemcreation.component.html',
  styleUrls: ['./itemcreation.component.css']
})
export class ItemcreationComponent implements OnInit {

  itemcreation: ItemCreation;
  createItemFrom: FormGroup;
  ItemAttributeForm: FormGroup;
  constructor(private itemcreationservice: ItemcreationService) { }

  ngOnInit() {
    this.ItemAttributeForm = new FormGroup({

    });
    this.createItemFrom = new FormGroup({
      itemname: new FormControl(''),
    });
  }
  CreateItem() {
    if (this.createItemFrom.valid) {
      this.itemcreation = Object.assign({}, this.createItemFrom.value);

      this.itemcreationservice.CreateItem(this.itemcreation).subscribe(() => {
        console.log('created');
      }, error => {
        console.log('error');
      });
  }}

  CreateItemAttribute() {
    console.log('ok');
  }
}
