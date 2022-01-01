import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { Token } from '../models/token';
import { HostService } from './host.service';
import { environment } from 'src/environments/environment';
import { User, UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: boolean = false;
  
  constructor(private http : HttpClient, 
              private session: SessionStorageService,
              private router: Router, 
              private host: HostService) { 
  }

  private getToken(): Token{
    return this.session.retrieve('token')
  }

  private storeToken(token: Token): void{
    this.session.store('token', token.AuthenticationResult.IdToken); 
  }

  private clearToken(): void{
    this.session.clear('token')
  }

  private getFakeToken(): Token{
    return {
      ChallengeParameters: {},
      AuthenticationResult:{
        AccessToken: 'faketoken',
        ExpiresIn: 0,  
        TokenType: 'rsa',
        RefreshToken: 'faketoken',
        IdToken: 'faketoken'
      }
    }
  }

  public login(userlogin: UserLogin): Observable<Token>{
    if(environment.mock){ 
      this.storeToken(this.getFakeToken())
      return of(this.getToken()) 
    }
    else{
      return this.http.post<Token>(`${this.host.getHost()}/defaults/token`, userlogin).pipe(
        tap((data: Token)=> { 
          this.loggedIn = true;
          this.storeToken(data);
        }),
        catchError((__:any)=> {
          this.loggedIn = false;
          return throwError('login error')
        })
      )
    }
  }
  
  public register(user: User): Observable<boolean>{
    if(environment.mock) { return of(true); }
    else{

      return this.http.post<Object>(`${this.host.getHost()}/defaults/register`, user).pipe(
        map((__:any) =>{
          return true;
        }),
        catchError((__:any)=>{
          return of(false)
        })
      )
    }
  }

  public verify(): Observable<boolean>{
    if(environment.mock){ 
      if(this.getToken()) return of(true);
      else return of(false);
    }
    else{
      return this.http.get<Object>(`${this.host.getHost()}/defaults/verify`).pipe(
        map((__:any)=> {  
          this.loggedIn = true;
          return true; 
        }),
        catchError((__: any)=> { 
          this.clearToken();
          return of(false);
        })
      )
    }
  }

  public logout(){
    this.clearToken()
    this.router.navigate(['']);
  }

}
