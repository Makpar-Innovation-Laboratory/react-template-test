import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

<<<<<<< HEAD
  selected: string = "cybersecurity";

  constructor() { }
=======
  public username : string;
>>>>>>> Dev


  selected: string = "cybersecurity";
  onSelect(input: string): void {
    this.selected = input;
  }

  constructor(private auth : AuthService) { 
    this.username = this.auth.getUsername()
  }

  onSelect(input: string): void {
    this.selected = input;
  }

}
