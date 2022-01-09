import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

interface Technology {
  name: string;
  description: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  panelOpenState = false;

  technologies: Technology[] = [
    { name: 'Angular', description: "Angular is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations." },
    { name: 'AWS CodeCommit', description: "AWS CodeCommit is a secure, highly scalable, managed source control service that hosts private Git repositories." },
    { name: 'Docker', description: "Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers." },
    { name: 'Python', description: "Python is an interpreted high-level general-purpose programming language." },
    { name: 'AWS Fargate', description: "AWS Fargate is a service that enables a user to run containers on Amazon's cloud computing platform without the need to manage the underlying infrastructure." },
  ]

  constructor() { 
    
  }

  ngOnInit(): void {
    
  }

}
