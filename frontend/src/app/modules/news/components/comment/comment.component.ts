import { Component, OnInit, OnDestroy, Input  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../../../services/blog.service';
import { Route, ActivatedRoute } from '@angular/router';
import {formatDate} from '@angular/common'
import { DialogComponent, DialogTypes } from '../../../../../shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppConfig } from 'src/config';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit{
  public postId: string;
  public commentForm: FormGroup;

  @Input() public child!: boolean;
  @Input() public parent_id!: number;
  
  public showComment: boolean = false;

  constructor(private fb: FormBuilder,
              private BlogService: BlogService,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
    this.postId = this.route.snapshot.params.id;
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
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

  public onSubmit() {
    let content
    if (this.child){
      content = {
        submitted: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        content: this.commentForm.value.content,
        news_id: this.postId,
      }
    } else {
      content = {
        submitted: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        content: this.commentForm.value.content,
        news_id: this.postId,
        parent_comment: this.parent_id
      }
    }
    
    this.BlogService.addComment(content).subscribe((response)=>{
      if(response){
        console.log("New comment added");
        // this.open_alert_dialog("The blog was successfully deleted");
      }
    })
  }

  public toggleComment(): void { this.showComment = !this.showComment; }

}