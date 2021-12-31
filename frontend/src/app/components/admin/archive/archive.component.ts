
import { BlogService } from '../../../services/blog.service';
import { Component, OnInit, } from '@angular/core';
import { Blog, BlogResponse } from 'src/app/models/blog';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  public blogs : Blog[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe((theseBlogs: BlogResponse)=>{
      this.blogs = theseBlogs.results;
    })
  }
 
  public deleteBlog(): void{

  }

}