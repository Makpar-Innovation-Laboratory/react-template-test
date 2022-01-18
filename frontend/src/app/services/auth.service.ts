import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';
import { Token } from '../models/token';
import { HostService } from './host.service';
import { environment } from 'src/environments/environment';
import { User, UserLogin } from '../models/user';
import { mockAuth } from 'src/environments/mock';

import jwt_decode from "jwt-decode";
import { AppConfig, AppRoute } from 'src/config';

/**
 * # AuthService
 * 
 * ## Description
 * 
 * ## Example Usage
 * 
 * ```javascript
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedIn: boolean = false;
  
  /**
   * # Description
   * Constructs an instance {@link AuthService}. If {@link environment} has the property `mock` set equal to `true`, then a fake JWT token will be stored in `SessionStorage` and all authentication calls to the backend API will be spoofed internally by this service.
   * @param http `HTTPClient` injection for making backend API service calls
   * @param session `SessionStorage` injection for interacting browser session.
   * @param router `Router` injection for routing user based on authentication state.
   * @param host {@link HostService} for determining host of backend API
   */
  constructor(private http : HttpClient, 
              private session: SessionStorageService,
              private router: Router, 
              private host: HostService) { 
  }

  /**
   * # Description
   * Retrieves the session's current token.
   * @returns {@link Token} token stored in `SessionStorage`.
   */
  private getToken(): Token{
    return this.session.retrieve('token');
  }

  /**
   * # Description
   * Parse `IdToken` and `Groups` from incoming token and store in `SessionStorage`.
   * @param token {@link Token} incoming token.
   */
  private storeToken(token: Token): void{
    this.session.store('username', Object(jwt_decode(token.AuthenticationResult.IdToken))['cognito:username'])
    // this.session.store('groups', token.AuthenticationResult.Groups);
    this.session.store('groups', 'developer');
    this.session.store('token', token.AuthenticationResult.IdToken); 
    this.session.store('refresh', token.AuthenticationResult.RefreshToken);
  }

  /**
   * # Description
   * Clear current session of `Groups` and `IdToken`.
   */
  private clearToken(): void{
    this.session.clear('username')
    this.session.clear('groups');
    this.session.clear('token');
    this.session.clear('refresh');
  }

  /**
   * # Description
   * Get the username of the current user
   * @returns username in the session
   */
  public getUsername(): string{
     return this.session.retrieve('username') 
  }

  /**
   * # Description
   * Determines if the user in the session belongs to the given `groupName`.
   * @param groupName
   * @returns `true` is user belongs to group, `false` otherwise.
   */
  public belongsToGroup(groupName: string): boolean{
    if(this.session.retrieve('groups')) return this.session.retrieve('groups').includes(groupName);
    else return false;
  }
  
   /**
   * # Description
   * Determine if the user in the current session is authorized to view a route.
   * @param thisRoute route against which user authorization is determined.
   * @returns `true` is user is authorized, `false` otherwise
   */
  public displayRouteForUser(thisRoute: AppRoute): boolean{
    let dev_routes : AppRoute[] = AppConfig.routes.filter(e=> e.dev)
    if(dev_routes.includes(thisRoute)) return this.belongsToGroup('developer');
    else return true; 
  }

  /**
   * # Description
   * Exchange {@link UserLogin} for {@link Token} and store result in `SessionStorage`.
   * @param userlogin {@link UserLogin} object containing user credentials.
   * @returns observavable containing the {@link Token}.
   */
  public login(userlogin: UserLogin): Observable<Token>{
    if(environment.mock){ 
      this.storeToken(mockAuth.token);
      return of(mockAuth.token);
    }
    else{
      return this.http.post<Token>(`${this.host.getHost()}/defaults/token`, userlogin).pipe(
        tap((data: Token)=> { 
          this.loggedIn = true;
          this.storeToken(data);
        }),
        catchError((err: any)=> {
          console.log(err);
          this.loggedIn = false;
          return throwError('login error');
        })
      )
    }
  }
  
  /**
   * # Description
   * Register a {@link User}.
   * @param user 
   * @returns an observable containing `true` if registration was successful, `false` otherwise.
   */
  public register(user: User): Observable<boolean>{
    if(environment.mock) { return of(true); }
    else{
      return this.http.post<Object>(`${this.host.getHost()}/defaults/register`, user).pipe(
        map((__:any) =>{ return true; }),
        catchError((__:any)=>{ return of(false); })
      )
    }
  }

  /**
   * # Description
   * Determine is the user in the session is currently authenticated.
   * @returns observable containing `true` if user is authenticated, `false` otherwise.
   */
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

  /**
   * # Description
   * Clear token from session and navigate to *login*.
   */
  public logout(){
    this.clearToken();
    this.router.navigate(['login']);
  }

}
