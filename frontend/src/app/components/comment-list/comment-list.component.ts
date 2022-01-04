// import { Comment } from './../comment.model';
import { Component, OnInit, Input, OnDestroy} from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import {Comment} from '../../models/news'

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnDestroy {
  postId!: string;
  showReply = false;
  togglePanel: any = {};
  commentSub!: Subscription;
  @Input() comments!: Comment[]
  constructor(
    private BlogService: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void{
    console.log(this.comments)
    this.postId = this.route.snapshot.params.id;
  }

  onDeleteComment(id:string) {
    //  this.commentService.deleteComment(id, this.postId);
  }

  onReply(){
    this.showReply = (!this.showReply) ? true : false;
  }
  ngOnDestroy() {
    this.commentSub.unsubscribe();
  }
}