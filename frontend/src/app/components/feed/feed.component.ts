import { Component, OnInit } from '@angular/core';
import { News, NewsResponse } from 'src/app/models/news';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public feed : News[] = [];

  /**
   * ## Description
   * Construct an instance of {@link FeedComponent}.
   * @param news {@link NewsService} for making service calls to the Innovation Lab API
   */
   constructor(private news: NewsService) {}

  /**
   * Angular Initialization LifeCycle Hook
   */
   ngOnInit(): void{
    this.news.getAllNews().subscribe((thisNews: NewsResponse)=>{
      this.feed = thisNews.results;
    })
  }

}
