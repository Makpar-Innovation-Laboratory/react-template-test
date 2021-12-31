import { MatDialog } from '@angular/material/dialog';
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';


interface Blog{
  title:string,
  content:string,
  tags:string[],
  feature_image:any
}

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})



export class UpdateBlogComponent implements OnInit {
  blog_id: string;

  constructor(private activatedRoute: ActivatedRouteSnapshot, 
              private dialog: MatDialog, 
              private blog_service: BlogService,
              ) {
    this.blog_id = this.activatedRoute.url[0].path
  }

  ngOnInit() {
      
  }

  get_blog_info(){

  }

}