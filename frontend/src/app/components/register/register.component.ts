import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerFormGroup: FormGroup;
  public loading: boolean = false;

  constructor(private auth: AuthService, 
              private router: Router,
              private formBuilder : FormBuilder) {
    this.registerFormGroup = this.formBuilder.group({
      username: this.formBuilder.control('', [Validators.required, Validators.maxLength(25)]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      business_name: this.formBuilder.control('', [Validators.required, Validators.maxLength(100)]),
      address: this.formBuilder.control('', [Validators.required, Validators.maxLength(250)]),
      notifications: this.formBuilder.control(true, [])
    })
  }

  public register(): void {

  }

}
