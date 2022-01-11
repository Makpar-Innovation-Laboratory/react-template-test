import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from './../../services/blog.service';
import { Route, ActivatedRoute } from '@angular/router';
import {formatDate} from '@angular/common'
import { DialogComponent } from '../../modules/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit{
  postId!: string;
  commentForm!: FormGroup;
  @Input() child!: string;
  @Input() parent_id!: number;
  constructor(
    private fb: FormBuilder,
    private BlogService: BlogService,
    private route: ActivatedRoute,
    private dialog:MatDialog) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params.id;
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    });
  }

  onCommentCancel() {
    this.commentForm.reset();
  }
  open_alert_dialog(message:string){
    let dialogRef = this.dialog.open(DialogComponent,{
      width:'550px',
      height: '200px',
      data:{
        message
      }
    });
  }
  onSubmit() {
    console.log('clicked')
    let content
    if (this.child === "false"){
      content = {
        submitted: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        content: this.commentForm.value.content,
        news_id: this.postId,
        flagged: false
      }
    } else {
      content = {
        submitted: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        content: this.commentForm.value.content,
        news_id: this.postId,
        parent_comment: this.parent_id
      }
    }
    
    console.log(content)
    this.BlogService.addComment(content).subscribe((response)=>{
      if(response){
        this.open_alert_dialog("The blog was successfully deleted");
      }
    })
  }
}