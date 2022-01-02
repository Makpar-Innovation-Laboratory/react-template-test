import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AppConfig, AppRoute } from '../config';
import { Animations,  expandStates } from 'src/animations';
import { DialogComponent, dialogTypes } from './components/dialog/dialog.component';

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
export class AppComponent {
  public title: string = "Makpar Innovation Lab";
  public menuState : string = expandStates.closed;
  public appRoutes: AppRoute[] = AppConfig.routes;

  /**
   * # Description
   * Constructs an instance {@link AppComponent}
   * @param auth {@link AuthService} instance injection for authenticating with backend API
   * @param dialog `MatDialog` instance injection for displaying signout message
   */
  constructor(private auth: AuthService,
              private dialog: MatDialog){ }

  /**
   * # Description
   * Switch {@link this.menuState} to opposite state.
   */
  public toggleMenu(): void{
    switch(this.menuState){
      case expandStates.open:
        this.menuState = expandStates.closed;
        break;
      case expandStates.closed:
        this.menuState = expandStates.open;
        break;
    }
  }

  /**
   * # Description
   * Close {@link menuState}, regardless of current state.
   */
  public closeMenu(): void{ this.menuState = expandStates.closed; }

  /** 
   * # Description
   * Open {@link menuState}, regardless of current state
   */
  public openMenu(): void { this.menuState = expandStates.open; }

  /**
   * # Description
   * Determine if the user in the current session is authorized to view a route.
   * @param thisRoute route against which user authorization is determined.
   * @returns `true` is user is authorized, `false` otherwise
   */
  public displayRouteForUser(thisRoute: AppRoute): boolean{
    if(['admin'].includes(thisRoute.route)) return this.auth.belongsToGroup('developer')
    else return true
  }

  /**
   * # Description
   * Displays a responsive `MatDialog` on screen.
   * @param message message to be displayed by the dialog
   */
   public confirmLogout(): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ message: AppConfig.signOutMsg, type: dialogTypes.YesOrNo, route: null}, 
      width: AppConfig.dialogWidth, height: AppConfig.dialogHeight
    });
    dialogRef.afterClosed().subscribe((confirm: boolean)=>{
      if(confirm){ this.auth.logout();}
    })
  }
}
