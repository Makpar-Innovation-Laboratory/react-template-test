import { Component } from '@angular/core';
 
/**
 * # AdminComponent
 * 
 * ## Description
 * 
 *  
 * ## Example Usage
 * 
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
  isShowing!: boolean
 
  /**
   * ## Description
   */
  constructor() { }
  toggle(): boolean{
    if (!this.isShowing){
        return this.isShowing = true;
    }
    else{
        return this.isShowing = false;
    }
  }
 
}
