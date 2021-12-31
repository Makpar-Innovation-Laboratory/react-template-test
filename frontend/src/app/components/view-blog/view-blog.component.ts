import { ActivatedRoute} from '@angular/router';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
  public blog_id : number;
  public blog: Blog | null | undefined;

  constructor(private blogService :BlogService, 
              private activatedRoute:ActivatedRoute) { 
    this.blog_id = this.activatedRoute.snapshot.params.id
  }

  ngOnInit() {
    this.blogService.getBlog(this.blog_id).subscribe((data: Blog)=>{
      this.blog = data
    });
  }

}
