import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimationControl, Animations, AnimationTriggers } from 'src/animations';
import { UserLogin } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

/**
 * # LoginComponent
 * ## Description
 * A component containing a {@link loginFormGroup} to validate user credentials before posting them to the Innovation Lab API through the {@link AuthService} dependency injection.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    Animations.getScaleTrigger(1.25),
    Animations.getHighlightTrigger(1.5),
    Animations.getFloatTrigger(0.5)
  ]
})
export class LoginComponent {

  /**
   * Boolean trigger for hiding password inputted in password form field.
   */
  public hidePassword: boolean = true;
  /**
   * Boolean trigger for displaying a progress buffer bar while credentials are posted.
   */
  public loading: boolean = false;
  /**
   * `FormGroup` for storing and validating user credentials inputted into form fields.
   */
  public loginFormGroup: FormGroup; 
  /**
   * {@link AnimationControl} for controlling the animation scale state of the login button.
   */
  public loginBtnScaleCntl: AnimationControl = new AnimationControl(AnimationTriggers.scale);
  /**
   * {@link AnimationControl} for controlling the animation highlight state of the login button
   */
  public loginBtnHighlightCntl: AnimationControl = new AnimationControl(AnimationTriggers.highlight);
  
  /**
   * # Description
   * Constructs an instanec of {@link LoginComponent}
   * @param auth {@link AuthService} service for posting credentials to Innovation Lab API.
   * @param router `Router` for routing user to home page after successful login
   * @param formBuilder `FormBuilder` for constructing the validators on the {@link loginFormGroup}
   */
  constructor(private auth: AuthService, 
              private router: Router,
              private formBuilder : FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    })
  }

  /**
   * # Description
   * Converts {@link loginFormGroup} into an instance of {@link UserLogin}
   * @returns object of type {@link UserLogin} with the user credentials from the login form.
   */
  private formToUserLogin(): UserLogin{
    return {
      username: this.loginFormGroup.controls.email.value,
      password: this.loginFormGroup.controls.password.value,
    }
  }

  /**
   * # Description
   * Method for posting the validated user login credentials contained in the {@link loginFormGroup} to the Innovation Lab API using the {@link auth} {@link AuthService}. User will be redirected to home page upon successful authentication.
   */
  public login() : void{
    if(this.loginFormGroup.valid){
      this.loading = true;
      this.auth.login(this.formToUserLogin()).subscribe((data)=>{
        if(data){ this.router.navigateByUrl('/'); }
      });
    }
    else{ this.loginFormGroup.markAsDirty() }
  }

  /**
   * # Description
   * Method for simultaneously firing the {@link loginBtnScaleCntl} and the {@link loginBtnHighlightCntl} {@link AnimationControl}s. Called from the binded login button in the HTML template when the user cursor enters the boundaries of the login button.
   */
  public animateLoginBtn(): void{
    if(this.loginFormGroup.valid){ 
      this.loginBtnScaleCntl.animate(); 
      this.loginBtnHighlightCntl.animate();
    }
  }

  /**
   * # Description
   * Method for simultaneously resetting (priming) the {@link loginBtnScaleCntl} and {@link loginBtnHighlightCntl} {@link AnimationControl}s. Called from the binded login button in the HTML template when the user cursor leaves the boundaries of the login button.
   */
  public primeLoginBtn(): void { 
    if(this.loginFormGroup.valid){ 
      this.loginBtnScaleCntl.prime(); 
      this.loginBtnHighlightCntl.prime();
    }
  }

}
