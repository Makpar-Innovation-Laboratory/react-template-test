import { BlogService } from '../../../services/blog.service';
import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogResponse } from 'src/app/models/blog';
import { DialogComponent } from '../../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  
  public blogFormGroup: FormGroup;

  constructor(private blogService: BlogService,
              private formBuilder : FormBuilder,
              private dialog:MatDialog, 
              private activatedRoute: ActivatedRoute) { 
    this.blogFormGroup = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required]),
      subject: this.formBuilder.control('', [Validators.required]),
      content: this.formBuilder.control('', [Validators.required])
    })

    // if url path is 'update/:id', initialize form group with news data from API
    if(this.activatedRoute.snapshot.url[0].path == 'update'){
      this.blogService.getBlog(this.activatedRoute.snapshot.params.id).subscribe((blog: BlogResponse)=>{
        this.blogFormGroup.controls.title.setValue(blog.results[0].title);
        this.blogFormGroup.controls.subject.setValue(blog.results[0].subject);
        this.blogFormGroup.controls.content.setValue(blog.results[0].content)
      })
    }
  }

  public confirmSubmission(message: string): void{
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ message }, 
      width:'50%', height:'25%'
    });
    dialogRef.afterClosed().subscribe((confirm:boolean)=>{
      if(confirm){ this.submit(); }
    })
  }

  public submit(): void {
    this.blogService.postBlog({
      news_id: null,
      title: this.blogFormGroup.controls.title.value,
      subject: this.blogFormGroup.controls.subject.value,
      content: this.blogFormGroup.controls.content.value,
      submitted: new Date()
    })
  }
}