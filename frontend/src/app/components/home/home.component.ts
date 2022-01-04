import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public username : string;
  public selected: string = "cybersecurity";

  constructor(private auth : AuthService) { 
    this.username = this.auth.getUsername()
  }

  public onSelect(input: string): void {
    this.selected = input;
  }

}
