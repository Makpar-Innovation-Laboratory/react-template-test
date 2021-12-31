import { BlogService } from '../../../services/blog.service';
import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogPostResponse, BlogResponse } from 'src/app/models/blog';
import { DialogComponent } from '../../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { EditorConfig } from './editor.config';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';

enum modes{
  edit='edit', new='new'
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  
  public newsFormGroup: FormGroup;
  public mode: modes = modes.new
  public editorConfig: AngularEditorConfig = EditorConfig;

  constructor(private blogService: BlogService,
              private formBuilder : FormBuilder,
              private activatedRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private dialog:MatDialog) { 
    this.newsFormGroup = this.formBuilder.group({
      title: this.formBuilder.control('', [Validators.required]),
      subject: this.formBuilder.control('', [Validators.required]),
      content: this.formBuilder.control('', [Validators.required]),
    })
    // if url path is 'update/:id', initialize form group with news data from API
    if(this.activatedRoute.snapshot.url[0].path == 'update'){
      this.mode = modes.edit
      this.blogService.getBlog(this.activatedRoute.snapshot.params.id).subscribe((blog: BlogResponse)=>{
        this.newsFormGroup.controls.title.setValue(blog.results[0].title);
        this.newsFormGroup.controls.subject.setValue(blog.results[0].subject);
        this.newsFormGroup.controls.content.setValue(blog.results[0].content)
      })
    }
  }

  private getDialogMessage(): string{
    if(this.mode == modes.edit) return "Edit post?" 
    else if(this.mode == modes.new) return "Submit new post?"
    else return "Do something?"
  }

  public confirmSubmission(): void{
    let msg = this.getDialogMessage();
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ msg }, 
      width:'50%', height:'25%'
    });
    dialogRef.afterClosed().subscribe((confirm:boolean)=>{
      console.log('here i am')
      console.log(confirm)
      if(confirm){ this.submit(); }
    })
  }

  public submit(): void {
    this.blogService.postBlog({
      news_id: null,
      title: this.newsFormGroup.controls.title.value,
      subject: this.newsFormGroup.controls.subject.value,
      content: this.newsFormGroup.controls.content.value,
      submitted: new Date().toISOString().slice(0, 10)
    }).subscribe((__: BlogPostResponse)=>{
      this.newsFormGroup.reset()
      this.snackBar.open('News story submitted!', 'OK')
    })
  }
}