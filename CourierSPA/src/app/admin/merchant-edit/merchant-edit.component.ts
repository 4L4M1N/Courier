import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-edit',
  templateUrl: './merchant-edit.component.html',
  styleUrls: ['./merchant-edit.component.css']
})
export class MerchantEditComponent implements OnInit {

  public imagePath;
  imgURL: any;
  filename: any;
  file: any;


  constructor() { }

  ngOnInit() {
  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    this.file = <File>files[0];
    this.filename = this.file.name;
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

}
