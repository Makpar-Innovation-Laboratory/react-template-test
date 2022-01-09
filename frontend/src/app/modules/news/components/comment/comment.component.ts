import { Component, OnInit, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/news';
import { CommentService } from 'src/app/services/comment.service';
import { AppConfig } from 'src/config';

/**
 * # CommentComponent
 * ## Description
 * ## Example Usage
 * ```html
 * <app-comment [child]="true|false" [parentId]="int"></app-comment>
 * ```
 */
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
  
  /**
   * 
   * @param fb 
   * @param comments {@link CommentService}
   * @param route 
   * @param snackBar 
   */
  constructor(private fb: FormBuilder,
              private comments: CommentService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,) {
    this.postId = this.route.snapshot.params.id;
    this.commentForm = this.fb.group({
      content: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit() { }

  /**
   * 
   */
  public onCommentCancel() : void{ this.commentForm.reset(); }

  /**
   * 
   */
  public toggleComment(): void { this.showComment = !this.showComment; }

  /**
   * 
   * @returns {@link Comment}
   */
  private formToComment(): Comment{
    return{
      content: this.commentForm.controls.content.value,
      news_id: this.postId,
      parent_comment: this.child ? null : this.parentId,
      child_comments: null, author: null,
      comment_id: null, submitted: null
    }
  }

  /**
   * 
   */
  public onSubmit() {
    this.comments.postComment(this.formToComment()).subscribe((__: any)=>{
      this.commentForm.reset();
      this.snackBar.open(AppConfig.commentAlert, 'OK');
    })
  }
}