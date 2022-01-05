import { Component, OnInit } from '@angular/core';
import { News, NewsPostResponse, NewsResponse } from 'src/app/models/news';
import { AuthService } from 'src/app/services/auth.service';
import { NewsService } from 'src/app/services/news.service';

/**
 * # FeedComponent
 * ## Description
 * Component for retrieving and rendering all stories in the Innovation Lab API news feed. If the user viewing the component belongs to the `developer` group, the Component will conditionally render administrative action buttons for editing and deleting stories.
 */
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
    
    // this.feed = [
    //   {
    //     "news_id": 3,
    //     "submitted": "2022-01-04",
    //     "subject": ["super", " fun"],
    //     "title": "Another one",
    //     "content": "Blah blah blah ginger lemon",
    //     "author": "pcofrancesco@makpar.com"
    //   },
    //   {
    //     "news_id": 4,
    //     "submitted": "2022-01-04",
    //     "subject": ["This time for real"],
    //     "title": "Third installment",
    //     "content": "What is the hardest word to pronounce, tune in next time",
    //     "author": "pcofrancesco@makpar.com"
    //   },
    //   {
    //     "news_id": 5,
    //     "submitted": "2022-01-04",
    //     "subject": ["next time on DBZ"],
    //     "title": "Back for revenge",
    //     "content": "worcestershire",
    //     "author": "pcofrancesco@makpar.com"
    //   },
    //   {
    //     "news_id": 6,
    //     "submitted": "2022-01-04",
    //     "subject": ["test test"],
    //     "title": "Fifth, I'm done ",
    //     "content": "erayhstghsdetyhrtyh",
    //     "author": "pcofrancesco@makpar.com"
    //   },
    //   {
    //     "news_id": 7,
    //     "submitted": "2022-01-04",
    //     "subject": ["passion"],
    //     "title": "6th and now with feeling",
    //     "content": "Last one&#160;",
    //     "author": "pcofrancesco@makpar.com"
    //   },
    //   {
    //     "news_id": 2,
    //     "submitted": "2021-12-29",
    //     "subject": ["update"],
    //     "title": "Adding another blog",
    //     "content": "<h1>﻿﻿Try this once more<br></h1>",
    //     "author": "pcofrancesco@makpar.com"
    //   }
    // ];

    this.news.getAllNews().subscribe((thisNews: NewsResponse)=>{
      this.feed = thisNews.results;
      console.log(thisNews.results)
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
