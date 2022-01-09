import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AppConfig, AppRoute } from '../config';
import { Animations } from 'src/animations';
import { DialogComponent, DialogTypes } from 'src/app/modules/shared/components/dialog/dialog.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

/**
 * # AppComponent
 * ## Description
 * Entrypoint of the Angular application.
 * ## Example Usage
 * ```html
 * <app-root></app-root>
 * ```
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    Animations.getExpandTrigger('5%')
  ]
})
export class AppComponent{
  public title: string = "Makpar Innovation Lab";
  public appRoutes: AppRoute[] = AppConfig.routes;
  public path: string;
  
  /**
   * # Description
   * Constructs an instance {@link AppComponent}
   * @param auth {@link AuthService} instance injection for authenticating with backend API
   * @param dialog `MatDialog` instance injection for displaying signout message
   */
  constructor(private auth: AuthService,
              private dialog: MatDialog,
              private activatedRoute: ActivatedRoute,
              private router: Router){
    this.path = activatedRoute.snapshot.url.toString();
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) { 
        console.log(`setting path to ${val.url}`)
        this.path = val.url; 
      }
  });
  }

  /**
   * # Description
   * Persist the user selected path
   * @param input path to be set
   */
  public onSelect(input: string): void {
    this.path = input
  }
  /**
   * # Description
   * Determine if the user in the current session is authorized to view a route.
   * @param thisRoute route against which user authorization is determined.
   * @returns `true` is user is authorized, `false` otherwise
   */
  public displayRouteForUser(thisRoute: AppRoute): boolean{
    return this.auth.displayRouteForUser(thisRoute);
  }

  /**
   * # Description
   * Determine if the passed in route is the currently activated route
   * @param thisRoute {@link AppRoute}
   * @returns 
   */
  public activeRoute(thisRoute: AppRoute): string{
    return thisRoute.route == this.path ? 'active-tab' : ''
  }

  /**
   * # Description
   * Displays a responsive `MatDialog` on screen.
   * @param message message to be displayed by the dialog
   */
   public confirmLogout(): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ message: AppConfig.signOutMsg, type: DialogTypes.YesOrNo, route: null}, 
      width: AppConfig.dialogWidth, height: AppConfig.dialogHeight
    });
    dialogRef.afterClosed().subscribe((confirm: boolean)=>{
      if(confirm){ this.auth.logout();}
    })
  }
}
