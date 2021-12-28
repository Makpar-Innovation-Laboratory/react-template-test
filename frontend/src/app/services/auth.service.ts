import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { Token } from '../models/token';
import { HostService } from './host.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: boolean = false;
  
  constructor(private http : HttpClient, private session: SessionStorageService,
    private router: Router, private host: HostService) { 
  }

  private storeToken(token: Token): void{
    this.session.store('token', token.AuthenticationResult.IdToken); 
  }

  private clearToken(): void{
    this.session.clear('token')
  }

  public login(username: string, password: string): Observable<Token>{
    let body = { username: username, password: password }
      let path : string= `${this.host.getHost()}/defaults/token`
      return this.http.post<Token>(path, body).pipe(
        tap((data: Token)=> { 
          this.loggedIn = true;
          this.storeToken(data);
        }),
        catchError((err: HttpErrorResponse)=> {
          this.loggedIn = false;
          return throwError('login error')
        })
      )
  }
  
  public verify(): Observable<boolean>{
    let path : string = `${this.host.getHost()}/defaults/verify`
      return this.http.get<Object>(path).pipe(
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

  public logout(){
    this.clearToken()
    this.router.navigate(['']);
  }

}
