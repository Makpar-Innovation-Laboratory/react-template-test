import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

const NON_AUTHED_ENDPOINTS=[
  "token", "register"
]

/**
 * # AuthInterceptor
 * 
 * ## Description
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private session: SessionStorageService){}

  /**
   * checks the path of the outgoing request for endpoints that needed authenticated
   * @param req outgoing request that needs a token appended to its headers
   * @returns `true` if the request needs a token, `false` otherwise
   */
  private needsAuthed(req: HttpRequest<any>): boolean{
    for(let non_authed_endpoint of NON_AUTHED_ENDPOINTS){
      if(req.url.includes(non_authed_endpoint)){
        return false;
      }
    }
    return true;
  }

  /**
   * Appends a token to the headers of the outgoing request, if it is required. This method gets injected into the HTTP request chain through the {@link AppModule} `providers` dependency injector. 
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      if (this.needsAuthed(req)){
        req = req.clone({
          setHeaders: { 'Authorization': `Bearer ${this.session.retrieve('token')}`, },
        });
      }
      return next.handle(req);
  }
}