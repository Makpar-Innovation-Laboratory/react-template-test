import { Component, OnInit } from '@angular/core';
import { AnimationPeriods, Animations } from 'src/animations';

interface Member {
  name: string;
  position: string;
  bio: string;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  animations:[
    Animations.getSlideTrigger(AnimationPeriods.short)
  ]
})
export class TeamComponent implements OnInit {

  members: Member[][] = [
    [
      { name: 'Tariq Islam', position: 'Director of Technology', bio: '' },
      { name: 'Peter Cofrancesco', position: 'Innovation Engineer', bio: '' },
      { name: 'Grant Moore', position: 'DevSecOps', bio: '' },
    ],
    [
      { name: 'Nickolas Sibley', position: 'Agile Coach', bio: '' },
      { name: 'Justin Stauffer', position: 'IT Engineer', bio: '' },
      { name: 'Selah Konur', position: 'Innovation Engineer', bio: '' },
    ],
    [
      { name: 'Aurora Pariseau', position: 'Full Stack Developer', bio: '' },
      { name: 'Thomas Klock', position: 'Full Stack Developer', bio: '' },
      { name: 'Phung Ngo', position: 'UX/Front End Developer', bio: '' },
    ]
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
