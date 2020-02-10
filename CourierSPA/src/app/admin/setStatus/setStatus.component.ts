import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SetStatus } from 'src/app/models/View/SetStatus';

@Component({
  selector: 'app-setStatus',
  templateUrl: './setStatus.component.html',
  styleUrls: ['./setStatus.component.css']
})
export class SetStatusComponent implements OnInit {
  selectedStatusId = 0;
  selectedItem:number = null;
  statusId = 0;
  statusName: string;
  statusValue: string;
  constructor(
    public dialogRef: MatDialogRef<SetStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SetStatus)
  { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }
  selectionChanged(e,i) {
    this.selectedItem = i
  }
  down(selectedStatusId) {
    this.statusId = selectedStatusId.Id;
    this.data.selectedStatusId = selectedStatusId.id;
    this.statusName = selectedStatusId.name;
    console.log(this.statusName);
  }

}
