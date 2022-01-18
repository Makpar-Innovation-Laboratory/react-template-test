import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AnimationControl, Animations, AnimationTriggers } from 'src/animations';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { AppConfig } from 'src/config';
import { DialogComponent, DialogTypes} from 'src/app/modules/shared/components/dialog/dialog.component';

/**
 * # RegisterComponent
 * ## Description
 * Component for validating user registration info and passing it to {@link AuthService} (and ultimately, the backend Innovation Lab API). 
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    Animations.getScaleTrigger(1.25),
    Animations.getHighlightTrigger(1.25),
    Animations.getFloatTrigger(0.5)
  ]
})
export class RegisterComponent {

  /**
   * `FormGroup` containing validation rules for user input.
   */
  public registerFormGroup: FormGroup;
  /**
   * {@link AnimationControl} for the register button's scale transform animation 
   */
  public registerBtnScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.scale);
  /**
   * {@link AnimationControl} for the register button's brightness transform animation.
   */
  public registerBtnHighlightCntl: AnimationControl = new AnimationControl(AnimationTriggers.highlight);
  /**
   * `boolean` trigger for the buffer bar shown while subscription loads backend API.
   */
  public loading: boolean = false;

  /**
   * # Description
   * Constructs an instance of {@link RegisterComponent}.
   * @param auth injected instances {@link AuthService} used for passing registration to backend API.
   * @param router `Router` for routing user to *"/login"* after successful registratino.
   * @param formBuilder `FormBuilder` for constructing validation rules for {@link registerFormGroup}.
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
   * @returns an instance of {@link User} populated by {@link registerFormGroup} controls.
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
   * If {@link registerFormGroup} is valid, then this method passes its contents to {@link AuthService} and then displays a `MatDialog` popup with instructions for user. Popup will redirect to *'/login'* if user clicks "OK".
   */
  public register(): void {
    if(this.registerFormGroup.valid){
      this.loading = true;
      this.auth.register(this.formToUser()).subscribe((registered : boolean)=>{
        if(registered){
          const dialogRef = this.dialog.open(DialogComponent,{
            data:{ message: AppConfig.registerMsg, type: DialogTypes.RouteLink, route: 'login' }, 
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
   * # Description
   * Fire the {@link registerBtnHighlightCntl} and {@link registerBtnScaleCntl} animations.
   */
  public animateRegisterBtn(): void{
    if(this.registerFormGroup.valid){
      this.registerBtnHighlightCntl.animate();
      this.registerBtnScaleCntl.animate();
    }
  }

  /**
   * # Description
   * Reset the {@link registerBtnHighlightCntl} and {@link registerBtnScaleCntl} animations.
   */
  public primeRegisterBtn(): void{
    if(this.registerFormGroup.valid){
      this.registerBtnHighlightCntl.prime();
      this.registerBtnScaleCntl.prime();
    }
  }

}
