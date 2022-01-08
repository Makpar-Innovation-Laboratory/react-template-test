import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

/**
 * # HomeComponent
 * ## Description
 * ## Example Usage
 * ```html
 * ```
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public username : string;
  public selected: string = "cybersecurity";

  /**
   * # Description
   * Constructs an instance of {@link HomeComponent}
   * @param auth instance of {@link AuthService} injected into component by Angular
   */
  constructor(private auth : AuthService) { 
    this.username = this.auth.getUsername()
  }

  /**
   * 
   * @param input 
   */
  public onSelect(input: string): void {
    this.selected = input;
  }

}
