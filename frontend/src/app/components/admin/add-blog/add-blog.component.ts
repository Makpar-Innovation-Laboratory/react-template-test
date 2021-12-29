import { AlertDialogBodyComponent } from './../../alert-dialog-body/alert-dialog-body.component';
import { BlogService } from './../../../services/blog.service';
import { FeatureImageService } from './../../../services/feature-image.service';
import { TagComponent } from './../../tag/tag.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogBodyComponent } from './../../dialog-body/dialog-body.component';
import {formatDate} from '@angular/common'

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  selectedFile!: File;
  preview_image:any;
  subject!: [];
  title!: string;
  content!: string;
  blog_id!: string;
  show_spinner: boolean = false;
  @ViewChild(TagComponent, {static:false}) childReference:any;
  constructor(private image_service: FeatureImageService, private blog_service:BlogService, private dialog:MatDialog) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.subject = this.childReference.tags;
  }

  processFile(imageInput:any){
    this.selectedFile = imageInput.files[0];
    this.previewImageLoad();
  }

  previewImageLoad(){
    let reader = new FileReader();
    reader.onloadend = e =>{
      this.preview_image = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  open_dialog(message:string){
    const dialogRef = this.dialog.open(DialogBodyComponent, {
      width: '550px',
      height: '200px',
      data: {
        message
      }
      
    });
    dialogRef.afterClosed().subscribe((confirm:boolean)=>{
      if(confirm){
        this.submit_blog();
      }
    })
    
  }

  open_alert_dialog(message:string){
    let dialogRef = this.dialog.open(AlertDialogBodyComponent,{
      width:'550px',
      height: '200px',
      data:{
        message
      }
    });
  }

  async submit_blog(){
      this.show_spinner = true;
      // const image_data = await this.image_service.upload_image(this.selectedFile).toPromise();
      let subArr: never[] = []
      this.subject.map((element)=>{
        subArr.push(element["name"])
      })

      // console.log(subArr.toString())
      let blog = {
        submitted:formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        title: this.title,
        content: String(this.content),
        // feature_image:image_data["data"].link,
        // subject:[]
        subject:subArr.toString()
      }

      // this.subject.map((element)=>{
      //   blog.subject.push(element["name"])
      // });

      this.blog_service.add_blog(blog).subscribe((response:any)=>{
        this.blog_id = response.id;
        this.show_spinner = false;
        this.open_alert_dialog(`Blog has been created with the id: ${this.blog_id}`);
        this.title = "";
        this.content = "";
        this.preview_image = "";
        this.subject = [];
      });

    }

}