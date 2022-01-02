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
import { mock } from 'src/environments/mock';

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
   * Constructs an instance {@link AuthService}.
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
   * Retrieves the session's current token
   * @returns {@link Token} token stored in `SessionStorage`.
   */
  private getToken(): Token{
    return this.session.retrieve('token')
  }

  /**
   * # Description
   * Parse `IdToken` and `Groups` from incoming token and store in `SessionStorage`
   * @param token {@link Token} incoming token.
   */
  private storeToken(token: Token): void{
    this.session.store('groups', token.AuthenticationResult.Groups)
    this.session.store('token', token.AuthenticationResult.IdToken); 
  }

  /**
   * # Description
   * Clear current session of `Groups` and `IdToken`.
   */
  private clearToken(): void{
    this.session.clear('groups')
    this.session.clear('token')
  }

  /**
   * # Description
   * Use configuration file to generate fake token
   * @returns {@link Token} mock token
   */
  private getFakeToken(): Token{
    return {
      ChallengeParameters: {},
      AuthenticationResult:{
        AccessToken: mock.token,
        ExpiresIn: 3600,  
        TokenType: 'HS256',
        RefreshToken: mock.token,
        IdToken: mock.token,
        Groups: mock.groups
      }
    }
  }

  /**
   * # Description
   * Determines if the user in the session belongs to the given `groupName`.
   * @param groupName
   * @returns `true` is user belongs to group, `false` otherwise
   */
  public belongsToGroup(groupName: string): boolean{
    if(this.session.retrieve('groups')) return this.session.retrieve('groups').includes(groupName);
    else return false;
  }
  
  /**
   * # Description
   * Exchange {@link UserLogin} for {@link Token} and store result in `SessionStorage`.
   * @param userlogin {@link UserLogin} object containing user credentials
   * @returns observavable containing the {@link Token}
   */
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
  
  /**
   * # Description
   * Register a {@link User}
   * @param user 
   * @returns an observable containing `true` if registration was successful, `false` otherwise
   */
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
    this.clearToken()
    this.router.navigate(['login']);
  }

}
