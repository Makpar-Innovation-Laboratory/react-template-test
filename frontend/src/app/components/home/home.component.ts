import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppConfig, AppRoute, Section } from 'src/config';

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
  public selected: Section = AppConfig.sections[0];
  public sections: Section[] = AppConfig.sections;
  public appRoutes: AppRoute[] = AppConfig.routes

  /**
   * # Description
   * Constructs an instance of {@link HomeComponent}
   * @param auth instance of {@link AuthService} injected into component by Angular
   */
  constructor(private auth : AuthService) { 
    this.username = this.auth.getUsername()
  }

  /**
   * # Description
   * Select a {@link Section} to view within the {@link HomeComponent}
   * @param input 
   */
  public onSelect(input: Section): void {
    this.selected = input;
  }

  /**
   * # Description
   * Determines if the input section key is the currently selected {@link Section}
   * @param section 
   * @returns 
   */
  public isSelected(section: Section): boolean{
    return section == this.selected;
  }

}
