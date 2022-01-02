import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { AuthService } from './services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, dialogTypes } from './components/dialog/dialog.component';
import { appRoute, componentConfig, menuStates } from './components/component.config';

/**
 * # AppComponent
 * 
 * ## Description
 * 
 * Entrypoint of the Angular application.
 * 
 * ## Example Usage
 * 
 * ```html
 * <app-root></app-root>
 * ```
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('menu',[
      state(menuStates.open, style({ 
        height: '5%', opacity: 1
      })),
      state(menuStates.closed, style({ 
        height: '0', opacity: 0 
      })),
      transition(`${menuStates.open} <=> ${menuStates.closed}`,[
        animate('0.5s')
      ])
    ])
  ]
})
export class AppComponent {
  public title: string = "Makpar Innovation Lab"
  public menuState : menuStates = menuStates.closed
  public appRoutes: appRoute[] = componentConfig.routes;

  /**
   * # Description
   * Constructs an instance {@link AppComponent}
   * @param auth 
   * @param dialog 
   */
  constructor(private auth: AuthService,
              private dialog: MatDialog){ }

  /**
   * # Description
   * Switch {@link this.menuState} to opposite state.
   */
  public toggleMenu(): void{
    switch(this.menuState){
      case menuStates.open:
        this.menuState = menuStates.closed;
        break;
      case menuStates.closed:
        this.menuState = menuStates.open;
        break;
    }
  }

  /**
   * # Description
   * Close {@link this.menuState}, regardless of current state.
   */
  public closeMenu(): void{ this.menuState = menuStates.closed; }

  /** 
   * # Description
   * Open {@link this.menuState}, regardless of current state
   */
  public openMenu(): void { this.menuState = menuStates.open; }

  /**
   * # Description
   * Determine if the user in the current session is authorized to view a route.
   * @param thisRoute route against which user authorization is determined.
   * @returns `true` is user is authorized, `false` otherwise
   */
  public displayRouteForUser(thisRoute: appRoute): boolean{
    if(['admin'].includes(thisRoute.route)) 
      return this.auth.belongsToGroup('administrator') || this.auth.belongsToGroup('developer')
    else return true
  }

  /**
   * # Description
   * Displays a responsive {@link MatDialog} on screen.
   * @param message message to be displayed by the dialog
   */
   public confirmLogout(): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ message: componentConfig.signOutMsg, type: dialogTypes.YesOrNo, route: null}, 
      width: componentConfig.dialogWidth, height: componentConfig.dialogHeight
    });
    dialogRef.afterClosed().subscribe((confirm: boolean)=>{
      if(confirm){ this.auth.logout();}
    })
  }
}
