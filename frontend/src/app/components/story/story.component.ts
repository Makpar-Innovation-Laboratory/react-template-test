import { ActivatedRoute} from '@angular/router';
import { NewsService } from '../../services/news.service';
import { Component, OnInit } from '@angular/core';
import { News, NewsResponse } from 'src/app/models/news';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  public newsId : number;
  public newsPost: News | undefined;

  constructor(private blogService: NewsService, 
              private activatedRoute: ActivatedRoute) { 
    this.newsId = this.activatedRoute.snapshot.params.id
  }

  ngOnInit() {
    this.blogService.getNews(this.newsId).subscribe((data: NewsResponse)=>{
      this.newsPost = data.results[0]
    });
  }

}
