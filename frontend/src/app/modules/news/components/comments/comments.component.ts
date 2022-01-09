import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/news';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() public comments: Comment[] | null = null;

  constructor() { }

  ngOnInit(): void { }

}
