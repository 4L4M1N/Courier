import { Injectable } from '@angular/core';
import { ConfirmDialogModel, ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  result: string = '';

constructor(public dialog: MatDialog) { }

confirmDialog(): void {
  const message = `Are you sure you want to do this?`;

  const dialogData = new ConfirmDialogModel("Confirm Action", message);

  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    maxWidth: "400px",
    data: dialogData
  });

  dialogRef.afterClosed().subscribe(dialogResult => {
    this.result = dialogResult;
  });
  console.log(this.result);
}
}
