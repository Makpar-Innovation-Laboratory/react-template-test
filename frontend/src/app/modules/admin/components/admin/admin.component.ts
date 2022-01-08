import { Component } from '@angular/core';
 
/**
 * # AdminComponent
 * ## Description
 * ## Example Usage
 * ```html
 * <app-admin></app-admin>
 * ```
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public isShowing: boolean = false;
 
  /**
   * ## Description
   */
  constructor() { }

  /**
   * 
   */
  public toggle(): void{ this.isShowing = !this.isShowing; }
 
}
