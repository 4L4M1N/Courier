import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { MessagesComponent } from '../shared/Messages/Messages.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
dialogRef: MatDialogRef<MessagesComponent>;
constructor(private dialog: MatDialog) { }

  public openDialog(title: string, message: string): Observable<any> {
    this.dialogRef = this.dialog.open(MessagesComponent, {
      height: '200px',
      width: '400px',
    });
    this.dialogRef.componentInstance.title = title;
    this.dialogRef.componentInstance.message = message;
    return this.dialogRef.afterClosed();
  }
}
