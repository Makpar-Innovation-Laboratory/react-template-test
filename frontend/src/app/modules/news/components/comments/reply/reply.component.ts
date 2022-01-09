import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { Comment } from 'src/app/models/news';
import { AppConfig } from 'src/config';

/**
 * # ReplyComponent
 * ## Description
 * ## Example Usage
 * ```html
 * <app-comment [child]="true|false" [parentId]="int"></app-comment>
 * ```
 */
@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {

  public showEditor: boolean = false;
  public postId: number;
  public commentForm: FormGroup;

  @Input() public commentId: number | null = null;
  @Input() public tooltip: string = "dialectical considerations on the epistemology of ontical solipism"
  
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
  public onCommentCancel() : void{ 
    this.commentForm.reset();}

  /**
   * 
   */
  public toggleEditor(): void { this.showEditor = !this.showEditor; }

  public processClick(): void{
    if(this.showEditor){ this.onSubmit(); }
    else{ this.toggleEditor(); }
  }
  /**
   * 
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
   * 
   */
  public onSubmit() {
    console.log(`this is the comment id you are replying to: ${this.commentId}`)
    if(this.commentForm.valid){
      this.comments.postComment(this.formToComment()).subscribe((__: any)=>{
        this.commentForm.reset();
        this.showEditor = false;
        this.snackBar.open(AppConfig.commentAlert, 'OK');
      })
    }
  }
}
