import { AuthService } from '../../services/auth.service';
import { DialogComponent, dialogTypes } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { ComponentConfig } from '../component.config';
 
/**
 * # AdminComponent
 * 
 * ## Description
 * 
 *  
 * ## Example Usage
 * 
 * ```html
 * <app-admin></app-admin>
 * ```
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
 
  /**
   * ## Description
   * Constructs an instance of {@link AdminComponent}.
   * @param dialog Reference to the {@link MatDialog} html component.
   * @param auth_service Authentication service for logging out.
   */
  constructor(private dialog: MatDialog,
              private auth:AuthService) { }
 
  /**
   * ## Description
   * Displays a responsive {@link MatDialog} on screen.
   * @param message message to be displayed by the dialog
   */
  public confirmLogout(message:string): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ message: message, type: dialogTypes.YesOrNo, route: null}, 
      width: ComponentConfig.dialogWidth, height: ComponentConfig.dialogHeight
    });
    dialogRef.afterClosed().subscribe((confirm: boolean)=>{
      if(confirm){ this.auth.logout();}
    })
  }
}
