import { Component, OnInit } from '@angular/core';
import { AnimationPeriods, Animations } from 'src/animations';

interface Project {
  title: string;
  description: string;
  tags: string[];
  date: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    Animations.getSlideTrigger(AnimationPeriods.short)
  ]
})


export class ProjectsComponent implements OnInit {

  projects: Project[] = [
    { 
      title: 'Project 1', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
      tags: ['Tech 1', 'Tech 2', 'Tech 3', 'Tech 4'],
      date: 'Jan 2022',
    },
    { 
      title: 'Project 2', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
      tags: ['Tech 1', 'Tech 2', 'Tech 3'],
      date: 'Nov 2021',
    },
    { 
      title: 'Project 3', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
      tags: ['Tech 1', 'Tech 2'],
      date: 'Sep 2021',
    },
    { 
      title: 'Project 4', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
      tags: ['Tech 1', 'Tech 2'],
      date: 'May 2021',
    },
  ]

  calHeight: number = 100/this.projects.length;
  yearHeight: string = 100/this.projects.length + '%';

  constructor() { }

  ngOnInit(): void {
  }

}
