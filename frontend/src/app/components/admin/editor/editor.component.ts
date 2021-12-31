import { NewsService } from '../../../services/news.service';
import { Component} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsPostResponse, NewsResponse } from 'src/app/models/news';
import { DialogComponent } from '../../dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { EditorConfig } from './editor.config';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';

enum modes{
  edit='edit', new='new'
}

/**
 * # EditorComponent
 * 
 * ## Description
 * 
 * ## Example Usage
 * 
 * ```html
 * <app-editor></app-editor>
 * ```
 */
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  public newsFormGroup: FormGroup;
  public mode: modes = modes.new
  public editorConfig: AngularEditorConfig = EditorConfig;

  /**
   * # Description
   * Constructs an instance of {@link EditorComponent}
   * @param news {@link NewsService} for making service calls to Innovation Lab API
   * @param formBuilder {@link FormBuilder} for creating reactive form grups
   * @param activatedRoute {@link ActivatedRoute} for passing in path parameter
   * @param snackBar {@link MatSnackBar} for displaying results of user actions
   * @param dialog {@link MatDialog} for displaying pop-up dialogs
   */
  constructor(private news: NewsService,
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
      this.news.getNews(this.activatedRoute.snapshot.params.id).subscribe((blog: NewsResponse)=>{
        this.newsFormGroup.controls.title.setValue(blog.results[0].title);
        this.newsFormGroup.controls.subject.setValue(blog.results[0].subject);
        this.newsFormGroup.controls.content.setValue(blog.results[0].content)
      })
    }
  }

  /**
   * # Description
   * Retrieves the dialog pop-up message based on the current value of {@link mode}. Modes are enumerated in the `enum` {@link modes}
   * @returns message to be displayed in dialog
   */
  private getDialogMessage(): string{
    if(this.mode == modes.edit) return "Edit post?" 
    else if(this.mode == modes.new) return "Submit new post?"
    else return "Do something?"
  }

  /**
   * # Description
   * Opens a {@link MatDialog} popup to confirm the user new story submission.
   */
  public confirmSubmission(): void{
    let msg = this.getDialogMessage();
    const dialogRef = this.dialog.open(DialogComponent,{
      data:{ msg }, 
      width:'50%', height:'25%'
    });
    dialogRef.afterClosed().subscribe((confirm:boolean)=>{
      if(confirm){ this.submit(); }
    })
  }

  /**
   * # Description
   * Post the news story held in {@link newsFormGroup}. `FormGroup` must be valid or else submission will not occur.
   */
  public submit(): void {
    if(this.newsFormGroup.valid){
      this.news.postNews({
        news_id: null,
        title: this.newsFormGroup.controls.title.value,
        subject: this.newsFormGroup.controls.subject.value,
        content: this.newsFormGroup.controls.content.value,
        submitted: new Date().toISOString().slice(0, 10)
      }).subscribe((__: NewsPostResponse)=>{
        this.newsFormGroup.reset()
        this.snackBar.open('News story submitted!', 'OK')
      })
    }
  }
}