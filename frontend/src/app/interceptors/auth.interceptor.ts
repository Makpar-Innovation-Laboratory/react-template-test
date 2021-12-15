import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SessionStorageService } from 'ngx-webstorage';

const NON_AUTHED_ENDPOINTS=[
  "token", "verify", "register"
]

/** Inject With Credentials into the request */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private session: SessionStorageService){}

  public needsAuthed(req: HttpRequest<any>): boolean{
    for(let non_authed_endpoint of NON_AUTHED_ENDPOINTS){
      if(req.url.includes(non_authed_endpoint)){
        return false;
      }
    }
    return true;
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

      if (this.needsAuthed(req)){
        req = req.clone({
          setHeaders: { 'Authorization': `Bearer ${this.session.retrieve('token')}`, },
          withCredentials:true
        });
      }
      return next.handle(req);
  }
}