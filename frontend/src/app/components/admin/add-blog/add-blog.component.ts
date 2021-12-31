import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Blog } from 'src/app/models/blog';
import { DialogBodyComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent {
  
  public blogFormGroup: FormGroup;

  constructor(private blog: BlogService,
              private formBuilder : FormBuilder,
              private dialog:MatDialog) { 
    this.blogFormGroup = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required]),
      subject: this.formBuilder.control('', [Validators.required]),
      content: this.formBuilder.control('', [Validators.required])
    })
  }

  public confirmSubmission(message: string): void{
    const dialogRef = this.dialog.open(DialogBodyComponent,{
      data:{ message }, 
      width:'50%', height:'25%'
    });
    dialogRef.afterClosed().subscribe((confirm:boolean)=>{
      if(confirm){ this.submit(); }
    })
  }

  public submit(): void {
    this.blog.postBlog({
      id: null,
      title: this.blogFormGroup.controls.title.value,
      subject: this.blogFormGroup.controls.subject.value,
      content: this.blogFormGroup.controls.content.value,
      submitted: new Date()
    })
  }
}