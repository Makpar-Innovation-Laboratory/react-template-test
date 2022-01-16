import { Component, OnInit } from '@angular/core';
import { AnimationPeriods, Animations } from 'src/animations';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css'],
  animations:[
    Animations.getSlideTrigger(AnimationPeriods.short)
  ]
})
export class MissionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
