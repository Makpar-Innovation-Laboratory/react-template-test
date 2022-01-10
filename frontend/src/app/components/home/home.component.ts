import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationPeriods, Animations, FadeStates } from 'src/animations';
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
  styleUrls: ['./home.component.css'],
  animations:[
    Animations.getFadeTrigger(AnimationPeriods.short)
  ]
})
export class HomeComponent {

  public username : string;
  public selected: Section = AppConfig.sections[0];
  public sections: Section[] = AppConfig.sections;
  public appRoutes: AppRoute[] = AppConfig.routes
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
   * @param input 
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
   * Determines if the input section key is the currently selected {@link Section}
   * @param section 
   * @returns 
   */
  public isSelected(section: Section): boolean{ return section == this.selected; }

}
