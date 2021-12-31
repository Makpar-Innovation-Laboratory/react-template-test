import { BlogService } from './../../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  
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

  ngOnInit() {
  }

  public submit(): void {
    let now = new Date()
    let new_blog;
  }
}