import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AssignDelivMan } from 'src/app/models/View/assignDelivMan';

@Component({
  selector: 'app-assignDelivMan',
  templateUrl: './assignDelivMan.component.html',
  styleUrls: ['./assignDelivMan.component.css']
})
export class AssignDelivManComponent implements OnInit {
  selectedDelivManId = '';
  delivManName: string;
  constructor(
    public dialogRef: MatDialogRef<AssignDelivManComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AssignDelivMan)
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
  down(selectedDelivManId ) {
    
    this.delivManName = selectedDelivManId.name;
     alert(selectedDelivManId. delivManIdentity);
  }

}
