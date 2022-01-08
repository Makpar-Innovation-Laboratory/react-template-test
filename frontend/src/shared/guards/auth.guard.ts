import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    route.url.toString().includes('admin')
    return this.auth.verify().pipe(
      tap( (data)=>{
        if(!data){this.router.navigateByUrl('/login')}
      }),
      catchError((err: any)=>{
        this.router.navigateByUrl('/login')
        return throwError(err)
      })
    );
  }
  
}