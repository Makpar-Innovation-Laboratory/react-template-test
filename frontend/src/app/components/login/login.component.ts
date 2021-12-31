import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginFormGroup: FormGroup;
  public hidePassword: boolean = true;
  public loading: boolean = false;
  
  constructor(private auth: AuthService, 
              private router: Router,
              private formBuilder : FormBuilder) {
    this.loginFormGroup = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    })
  }

  ngOnInit(): void { }

  public login() : void{
    if(this.loginFormGroup.valid){this.loading = true;
      this.auth.login(this.loginFormGroup.controls['email'].value, 
                        this.loginFormGroup.controls['password'].value).subscribe((data)=>{
        if(data){ this.router.navigateByUrl('/'); }
      });
    }
    else{ this.loginFormGroup.markAsDirty() }
    
  }

}
