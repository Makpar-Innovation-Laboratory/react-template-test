// import { Comment } from './../comment.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Comment} from '../../../../models/news'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  postId!: string;
  showReply = false;
  togglePanel: any = {};
  @Input() comments!: Comment[];
  
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void{
    console.log(this.comments)
    this.postId = this.route.snapshot.params.id;
  }

  onDeleteComment(id:string) { }
}