import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum dialogTypes {
  YesOrNo="YesOrNo", OK="OK", RouteLink="RouteLink"
}

/**
 * # Description
 * A {@link DialogComponent} can be initialized in three ways:
 * 
 *  1. 'YesOrNo' dialog
 *  2. 'OK' dialog
 *  3. 'RouteLink' dialog
 * 
 * The type of dialog is specified by passing in `type` through the `data` injection. Types are accessible through the exported `enum` {@link dialogTypes}
 * 
 * ## Example Usage
 * Inject a {@link MatDialog} into the component class where the dialog is being used,
 * ```javascript
 * constructor(private dialog: MatDialog,)
 * ```
 * Template the injected component with the {@link DialogComponent} class and provide initialization data. Subscribe to the event into which the component is hooking.
 * ```javascript
 *  const dialogRef = this.dialog.open(DialogComponent,{
 *      data:{ message, type: dialogTypes.YesOrNo},
 *      width:'50%', height:'25%'
 *  });
 * dialogRef.afterClosed().subscribe((confirm: boolean)=>{
 *    if(confirm){ this.auth_service.logout();}
 * })
 * ```
 */
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{

  public message: string;
  public type: dialogTypes;

  /**
   * # Description
   * constructs an instance {@link DialogComponent}
   * @param dialogRef 
   * @param data object containing the initialization data for a {@link MatDialog}. `type` corresponds to the type of {@link DialogComponent} being instantiated. If `type == 'YesOrNo'` or `type == 'OK'`, then the second property of the object, `message`, is the message displayed on the dialog. If `type == 'RouteLink'`, the `message` property represents the route to which the dialog will direct the user.
   */
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = this.data.message;
      this.type = this.data.type;
  }
  
  /**
   * Process a user click.
   * @param confirm boolean signal passed up to ${@link dialogRef}'s `close` listeners.
   */
  public onClick(confirm: boolean): void{
    this.dialogRef.close(confirm);
  }


}
