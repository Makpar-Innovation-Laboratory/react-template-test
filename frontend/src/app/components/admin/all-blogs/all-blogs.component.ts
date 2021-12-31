
import { BlogService } from './../../../services/blog.service';
import { Component, OnInit, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Blog, BlogsResponse } from 'src/app/models/blog';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})



export class AllBlogsComponent implements OnInit {

  public blogs : Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe((theseBlogs: BlogsResponse)=>{
      console.log(theseBlogs)
      this.blogs = theseBlogs.results;
    })
  }
 
  public deleteBlog(): void{

  }

}