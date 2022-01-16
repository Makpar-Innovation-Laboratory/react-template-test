import { Component } from '@angular/core';
import { AnimationPeriods, Animations, FadeStates } from 'src/animations';
import { AuthService } from 'src/app/services/auth.service';
import { AppConfig, AppRoute, Section } from 'src/config';

/**
 * # HomeComponent
 * ## Description
 * Component for rendering splash page. User is redirected from {@link LoginComponent} after successfully authenticating with Innovation Lab API.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations:[
    Animations.getFadeTrigger(AnimationPeriods.short),
    Animations.getSlideTrigger(AnimationPeriods.short)
  ]
})
export class HomeComponent {
  /**
   * Username stored in session.
   */
  public username : string;
  /**
   * Currently selected {@link Section}
   */
  public selected: Section = AppConfig.sections[0];
  /**
   * Array of {@link Section} pulled from {@link AppConfig}, used to dynamically render a {@link Section} in the HTML template based on user input.
   */
  public sections: Section[] = AppConfig.sections;
  /**
   * Array of {@link AppRoute} pulled from {@link AppConfig}, used to dynamically routes in toolbar and sidenav in HTML template.
   */
  public appRoutes: AppRoute[] = AppConfig.routes
  /**
   * {@link FadeStates} implementation for controlling the {@link Section} fade in-out animation. Binded to the section in the HTML through animation directive.
   */
  public sectionFadeState: FadeStates = FadeStates.in;

  /**
   * # Description
   * Constructs an instance of {@link HomeComponent}
   * @param auth instance of {@link AuthService} injected into component by Angular
   */
  constructor(private auth : AuthService) { this.username = this.auth.getUsername() }

  /**
   * # Description
   * Select a {@link Section} to view within the {@link HomeComponent}. Initiates the animation of the section through the {@link sectionFadeState}.
   * @param input {@link Section} user has selected.
   */
  public onSelect(input: Section): void {
    this.sectionFadeState = FadeStates.out;
    setTimeout(()=>{
      this.selected = input; 
      this.sectionFadeState = FadeStates.in;
    }, AnimationPeriods.short*1000)
  }

  /**
   * # Description
   * Determines if the inputted {@link Section} is the currently selected {@link Section}
   * @param section {@link Section} whose selection is to be determined.
   * @returns `true` if section is the current selection, `false` otherwise.
   */
  public isSelected(section: Section): boolean{ return section == this.selected; }

}
