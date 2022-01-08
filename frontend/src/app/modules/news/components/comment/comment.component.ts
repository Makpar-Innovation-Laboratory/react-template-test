import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent, DialogTypes } from '../../../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppConfig } from 'src/config';
import { Comment } from 'src/app/models/news';

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
              private BlogService: BlogService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.postId = this.route.snapshot.params.id;
    this.commentForm = this.fb.group({
      content: this.fb.control('', [Validators.required]),
    });
  }

  ngOnInit() { }

  public onCommentCancel() : void{
    this.commentForm.reset();
  }

  public openAlertDialog(message: string): void{
    this.dialog.open(DialogComponent,{
      data:{ message: "Message goes here", type: DialogTypes.OK, route: null }, 
      width: AppConfig.dialogWidth, height: AppConfig.dialogHeight
    });
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

  public onSubmit() {
    this.BlogService.addComment(this.formToComment()).subscribe((response)=>{
      if(response){ console.log("New comment added"); }
    })
  }

  public toggleComment(): void { this.showComment = !this.showComment; }

}