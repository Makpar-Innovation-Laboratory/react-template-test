import { AuthService } from '../../services/auth.service';
import { DialogBodyComponent } from './../dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
 
  constructor(private dialog:MatDialog,
              private auth_service:AuthService) { }
 
  public open_dialog(message:string): void{
    const dialogRef = this.dialog.open(DialogBodyComponent,{
      data:{ message }, width:'550px', height:'200px'
    });
    dialogRef.afterClosed().subscribe((confirm:boolean)=>{
      if(confirm){ this.auth_service.logout();}
    })
  }
}
