import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum types {
  YesOrNo=1, OK=2, RouteLink=3
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{

  public message: string;
  public type: types;

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = this.data.message;
      this.type = this.data.type;
  }
  
  public onClick(confirm: boolean): void{
    this.dialogRef.close(confirm);
  }


}
