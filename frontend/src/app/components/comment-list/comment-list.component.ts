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
export class CommentListComponent implements OnInit {
  postId!: string;
  showReply = false;
  togglePanel: any = {};
  commentSub!: Subscription;
  @Input() comments!: Comment[];
  
  constructor(
    private blog: BlogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void{
    console.log(this.comments)
    this.postId = this.route.snapshot.params.id;
  }

  onDeleteComment(id:string) {
    //  this.commentService.deleteComment(id, this.postId);
  }

  flagFReview(id:number, comment:Comment){
    let content = {
        // author: comment.author,
        // child_comments:comment.child_comments,
        // comment_id: comment.comment_id,
        // submitted: comment.submitted,
        content: comment.content,
        // news_id: this.postId,
        // parent_comment: comment.parent_comment,
        flagged: true
    }
    this.blog.flagComment(id, content).subscribe((response)=>{
      console.log(response)
    })

  }

  onReply(){
    this.showReply = (!this.showReply) ? true : false;
  }
  // ngOnDestroy() {
  //   this.commentSub.unsubscribe();
  // }
}