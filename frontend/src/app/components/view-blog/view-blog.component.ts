import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';

interface Blog{
  title:string,
  content:string,
  feature_image:string,
  tags: string[],
  created_at: string
}

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {
  blog_id!:string;
  blog_props : Blog = {
    title: "",
    content:"",
    feature_image: "",
    tags: [],
    created_at:""
  };
  constructor(private blog_service:BlogService, private active_route:ActivatedRoute) { }

  ngOnInit() {
    this.active_route.params.subscribe((response)=>{
      this.blog_id = response.id;
      this.get_blog_details();
    })
    
  }

  get_blog_details(){
    this.blog_service.get_single_blog(this.blog_id).subscribe((response:any)=>{
      console.log(response)
      this.blog_props.title = response['results'][0]['title'];
      this.blog_props.content = response['results'][0]['content'];
      // this.blog_props.feature_image = response.single_blog.feature_image;
      this.blog_props.created_at = response['results'][0]['submitted'];
      response['results'][0]['subject'].forEach((element:any) => {
        this.blog_props.tags.push(element);
      });
    });
  }
  returnHtmlFromRichText(richText:string) {
    if (richText === undefined || richText === null ) {
      return '<p>Error</p>';
    }
    let doc = new DOMParser().parseFromString(richText, "text/html")
    return ;
}

}
