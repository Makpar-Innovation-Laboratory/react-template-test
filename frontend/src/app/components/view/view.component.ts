import { ActivatedRoute} from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { Component, OnInit } from '@angular/core';
import { Blog, BlogResponse } from 'src/app/models/blog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public blog_id : number;
  public blog: Blog | null | undefined;

  constructor(private blogService :BlogService, 
              private activatedRoute:ActivatedRoute) { 
    this.blog_id = this.activatedRoute.snapshot.params.id
  }

  ngOnInit() {
    this.blogService.getBlog(this.blog_id).subscribe((data: BlogResponse)=>{
      this.blog = data.results[0]
    });
  }

}
