import { AlertDialogBodyComponent } from './../../alert-dialog-body/alert-dialog-body.component';
import { DialogBodyComponent } from './../../dialog-body/dialog-body.component';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

interface Blog{
  title:string,
  content:string,
  feature_image:string,
  tags: []
}

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})



export class AllBlogsComponent implements OnInit {
  blogs: Blog[] = [];
  deleted_blog_id!:string;
  show_spinner:boolean = false;
  constructor(private blog_service:BlogService, private dialog:MatDialog) {}

  ngOnInit() {
    this.load_all_blogs();
  }
  
  load_all_blogs(){
    console.log('fetching blogs')
    this.blog_service.get_all_blogs().subscribe((response:any)=>{
      console.log(response)
      response.results.forEach((element:any) => {
        this.blogs.push(element);
      });
    })
  }

  open_dialog(message:string, blog_id:string): void {
    let dialogRef = this.dialog.open(DialogBodyComponent,{
      data: {
        message
      },
      width: '550px',
      height:'200px'
    })

    dialogRef.afterClosed().subscribe((confirm:boolean)=>{
      if(confirm){
        this.delete_single_blog(blog_id);
      }
    });
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



  delete_single_blog(blog_id:string){
    this.show_spinner = true;
    this.blog_service.delete_blog(blog_id).subscribe((response)=>{
      if(response){
        this.show_spinner = false;
        this.open_alert_dialog("The blog was successfully deleted");
      }
    })
  }

}