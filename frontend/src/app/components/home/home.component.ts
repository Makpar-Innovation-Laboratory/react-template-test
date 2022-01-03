import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selected: string = "cybersecurity";

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(input: string): void {
    this.selected = input;
  }

}
