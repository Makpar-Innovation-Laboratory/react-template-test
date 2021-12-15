import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";

  public loginError : boolean = false;
  public hide : boolean = true;
  public loading : boolean = false;
  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  public login() : void{
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe((data)=>{
      if(!data){ this.loginError = true; }
      else{ this.router.navigateByUrl('/home'); }
    });
  }

  public validate(){
    if(this.username && this.password){ this.login(); }
  }

}
