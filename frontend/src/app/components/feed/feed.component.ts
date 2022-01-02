import { Component, OnInit } from '@angular/core';
import { News, NewsPostResponse, NewsResponse } from 'src/app/models/news';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  public isDeveloper: boolean = false;
  public feed: News[] = [];

  /**
   * ## Description
   * Construct an instance of {@link FeedComponent}.
   * @param news {@link NewsService} for making service calls to the Innovation Lab API
   */
   constructor(private news: NewsService,
                private auth: AuthService) {}

  /**
   * Angular Initialization LifeCycle Hook
   */
   ngOnInit(): void{
    this.isDeveloper = this.auth.belongsToGroup('developer')
    this.news.getAllNews().subscribe((thisNews: NewsResponse)=>{
      this.feed = thisNews.results;
    })
  }

   /**
   * # Description
   * Delete a news story from the Innovation Lab
   * @param id id of the {@link News} story to be deleted
   */
    public deleteNews(id: number): void{
      this.news.deleteNews(id).subscribe((__: NewsPostResponse)=>{
        return 
      })
    }

}
