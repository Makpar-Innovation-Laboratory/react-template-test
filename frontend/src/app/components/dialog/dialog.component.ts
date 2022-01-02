import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animations, HighlightStates, ScaleStates } from 'src/animations';

export enum DialogTypes {
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
  styleUrls: ['./dialog.component.css'],
  animations: [
    Animations.getScaleTrigger(1.25),
    Animations.getHighlightTrigger(1.25)
  ]
})
export class DialogComponent{

  public message: string;
  public type: DialogTypes;
  public route: string;
  public primaryBtnScaleCntl: ScaleStates = ScaleStates.null;
  public primaryBtnHighlightCntl: HighlightStates = HighlightStates.null;
  public secondaryBtnScaleCntl: ScaleStates = ScaleStates.null;
  public secondaryBtnHighlightCntl: HighlightStates = HighlightStates.null;

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
      this.route = this.data.route;
  }
  
  /**
   * Process a user click.
   * @param confirm boolean signal passed up to ${@link dialogRef}'s `close` listeners.
   */
  public onClick(confirm: boolean): void{
    this.dialogRef.close(confirm);
  }


  public animatePrimary(): void {
    this.primaryBtnHighlightCntl = HighlightStates.highlight;
    this.primaryBtnScaleCntl = ScaleStates.scale;
  }

  public normalizePrimary(): void {
    this.primaryBtnHighlightCntl = HighlightStates.null;
    this.primaryBtnScaleCntl = ScaleStates.null;
  }

  public animateSecondary(): void {
    this.secondaryBtnHighlightCntl = HighlightStates.highlight;
    this.secondaryBtnScaleCntl = ScaleStates.scale;
  }

  public normalizeSecondary(): void {
    this.secondaryBtnHighlightCntl = HighlightStates.null;
    this.secondaryBtnScaleCntl = ScaleStates.null;
  }
}
