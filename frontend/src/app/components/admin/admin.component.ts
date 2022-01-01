import { AuthService } from '../../services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
 
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
  constructor(private dialog:MatDialog,
              private auth_service:AuthService) { }
 
  /**
   * ## Description
   * Displays a responsive {@link MatDialog} on screen.
   * @param message message to be displayed by the dialog
   */
  public confirmLogout(message:string): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ message, type: 1}, 
      width:'50%', height:'25%'
    });
    dialogRef.afterClosed().subscribe((confirm: boolean)=>{
      if(confirm){ this.auth_service.logout();}
    })
  }
}
