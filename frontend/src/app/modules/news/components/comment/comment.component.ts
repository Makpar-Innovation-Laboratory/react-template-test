import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/news';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit{
  public showComment: boolean = false;
  public postId: number;
  public commentForm: FormGroup;

  @Input() public child!: boolean;
  @Input() public parentId!: number | null;
  
  constructor(private fb: FormBuilder,
              private comments: CommentService,
              private route: ActivatedRoute) {
    this.postId = this.route.snapshot.params.id;
    this.commentForm = this.fb.group({
      content: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit() { }

  public onCommentCancel() : void{
    this.commentForm.reset();
  }

  private formToComment(): Comment{
    return{
      content: this.commentForm.controls.content.value,
      news_id: this.postId,
      comment_id: null,
      submitted: null,
      parent_comment: this.child ? null : this.parentId,
      child_comments: null,
      author: null
    }
  }

  public onSubmit() { }

  public toggleComment(): void { this.showComment = !this.showComment; }

}