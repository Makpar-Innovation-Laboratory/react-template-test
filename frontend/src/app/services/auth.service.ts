import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
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

  private clearToken(token: Token): void{
    this.session.clear('token')
  }

  public login(username: string, password: string): Observable<Token>{
    let body = { username: username, password: password }
      let path : string= `${this.host.getHost()}/token/`
      return this.http.post<Token>(path, body).pipe(
        tap((data)=> { 
          this.loggedIn = true;
          this.storeToken(data);
        }),
        catchError((err: HttpErrorResponse)=> {
          this.loggedIn = false;
          console.log(err);
          return throwError('login error')
        })
      )
    }

  }
}
