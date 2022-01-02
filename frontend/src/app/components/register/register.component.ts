import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Animations, HighlightStates, ScaleStates } from 'src/animations';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AppConfig } from '../../../config';
import { DialogComponent, dialogTypes } from '../dialog/dialog.component';

/**
 * # RegisterComponent
 * 
 * ## Description
 * 
 * ## Example Usage
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    Animations.getScaleTrigger(1.25),
    Animations.getHighlightTrigger(1.25)
  ]
})
export class RegisterComponent {

  public registerFormGroup: FormGroup;
  public registerBtnScaleCntl: ScaleStates = ScaleStates.null;
  public registerBtnHighlightCntl: HighlightStates = HighlightStates.null;
  public loading: boolean = false;

  /**
   * # Description
   * Constructs an instance of {@link RegisterComponent}.
   * @param auth 
   * @param router 
   * @param formBuilder 
   */
  constructor(private auth: AuthService,
              private dialog: MatDialog, 
              private formBuilder : FormBuilder) {
    this.registerFormGroup = this.formBuilder.group({
      username: this.formBuilder.control('', [Validators.required, Validators.maxLength(25)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      business_name: this.formBuilder.control('', [Validators.required, Validators.maxLength(100)]),
      address: this.formBuilder.control('', [Validators.required, Validators.maxLength(250)]),
      notifications: this.formBuilder.control(true, [])
    })
  }

   /**
   * # Description
   * Converts {@link registerFormGroup} into an instance of {@link User}
   * @returns {@link User} with the user attributes from the register form.
   */
  private formToUser(): User{
    return{
      username: this.registerFormGroup.controls.username.value,
      email: this.registerFormGroup.controls.email.value,
      business_name: this.registerFormGroup.controls.business_name.value,
      address: this.registerFormGroup.controls.address.value,
      notifications: this.registerFormGroup.controls.notifications.value
    }
  }

  /**
   * # Description
   * 
   */
  public register(): void {
    if(this.registerFormGroup.valid){
      this.loading = true;
      this.auth.register(this.formToUser()).subscribe((registered : boolean)=>{
        if(registered){
          const dialogRef = this.dialog.open(DialogComponent,{
            data:{ message: AppConfig.registerMsg, type: dialogTypes.RouteLink, route: 'login' }, 
            width: AppConfig.dialogWidth, height: AppConfig.dialogHeight
          });
          dialogRef.afterClosed().subscribe((confirm: boolean)=>{
            if(confirm){ this.auth.logout();}
          })
        }
      })
    }
  }

  /**
   * 
   */
  public animateRegisterBtn(): void{
    if(this.registerFormGroup.valid){
      this.registerBtnHighlightCntl = HighlightStates.highlight;
      this.registerBtnScaleCntl = ScaleStates.scale;
    }
  }

  /**
   * 
   */
  public normalizeRegisterBtn(): void{
    if(this.registerFormGroup.valid){
      this.registerBtnHighlightCntl = HighlightStates.null;
      this.registerBtnScaleCntl = ScaleStates.null;
    }
  }

}
