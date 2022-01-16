import { Component, OnInit } from '@angular/core';
import { AnimationPeriods, Animations } from 'src/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    Animations.getSlideTrigger(AnimationPeriods.short)
  ]
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
