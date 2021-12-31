import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

enum menuStates{ open="open", closed="closed"}

interface appRoute { route: string, title: string }

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
  public menuState : menuStates = menuStates.closed
  public appRoutes: appRoute[] = [
    { route: '', title: 'Home' },
    { route: 'news', title: 'News Feed' },
    { route: 'docs', title: 'Documentation' },
    { route: 'admin', title: 'Admin Console' },  
  ];

  /**
   * 
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
   * 
   */
  public closeMenu(): void{ this.menuState= menuStates.closed; }
}
