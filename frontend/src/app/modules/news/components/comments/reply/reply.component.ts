import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { Comment } from 'src/app/models/news';
import { AppConfig } from 'src/config';

/**
 * # ReplyComponent
 * ## Description
 * A widget for replying to comments. Pass in a {@link commentId} to bind this component to a particular comment. The component will display a `mat-card` with a `reply` icon button. If the user clicks on the `reply`, a comment form will unfold to allow the user to reply to this comment. 
 * ## Example Usage
 * ```html
 * <app-reply [commentId]="1" [tooltip]="Reply to a comment!"></app-reply>
 * ```
 */
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent{

  public showEditor: boolean = false;
  public postId: number;
  public commentForm: FormGroup;

  @Input() public commentId: number | null = null;
  @Input() public tooltip: string = "dialectical considerations on the epistemology of ontical solipism"
  
  /**
   * # Description
   * Constructs an instance {@link ReplyComponent}
   * @param fb Instance of `FormBuilder` to used to construct {@link commentForm}
   * @param comments {@link CommentService} used to post comments to the Innovation Lab API
   * @param route current `ActivatedRoute` 
   * @param snackBar `MatSnackBar` used to alert user of successful comment post.
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

  /**
   * # Description
   * Reset {@link commentForm}.
   */
  public onCommentCancel() : void{ 
    this.commentForm.reset();}

  /**
   * 
   */
  public toggleEditor(): void { this.showEditor = !this.showEditor; }

  /**
   * # Description
   * If {@link commentForm} is not displayed, toggle {@link showEditor} to display it. If {@link commentForm} is displayed, submit new {@link Comment}.
   */
  public processClick(): void{
    if(this.showEditor){ this.onSubmit(); }
    else{ this.toggleEditor(); }
  }
  /**
   * # Description
   * Transfer the contents of {@link commentForm} into a {@link Comment} object.
   * @returns {@link Comment} 
   */
  private formToComment(): Comment{
    return{
      content: this.commentForm.controls.content.value,
      news_id: this.postId,
      parent_comment: this.commentId ? null : this.commentId,
      child_comments: null, author: null,
      comment_id: null, submitted: null
    }
  }

  /**
   * # Description
   * Submit {@link commentForm} if it has passed all of its validation checks. 
   */
  public onSubmit() {
    if(this.commentForm.valid){
      this.comments.postComment(this.formToComment()).subscribe((__: any)=>{
        this.commentForm.reset();
        this.showEditor = false;
        this.snackBar.open(AppConfig.commentAlert, 'OK');
      })
    }
  }
}
