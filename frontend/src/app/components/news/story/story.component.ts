import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../../services/news.service';
import { Component, OnInit } from '@angular/core';
import { News, NewsResponse } from 'src/app/models/news';

/**
 * # StoryComponent
 * ## Description
 * Component for retrieving and rendering a single news story from the Innovation Lab API, passed into the component via the route parameter.
 */
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css'],
})
export class StoryComponent implements OnInit {
  public newsId: number;
  public newsPost: News | undefined;

  /**
   * # Description
   * Constructs an instance of {@link StoryComponent}
   * @param news service for retrieving news feed from Innovation Lab API
   * @param activatedRoute currently activated route in user brwoser
   */
  constructor(
    private news: NewsService,
    private activatedRoute: ActivatedRoute
  ) {
    this.newsId = this.activatedRoute.snapshot.params.id;
    // console.log(this.newsId)
  }

  /**
   * Angular Lifecycle Hook initialization
   */
  
  
  ngOnInit() {

    // this.newsPost = {
    //   "news_id": 3,
    //   "submitted": "2022-01-04",
    //   "subject": ["super", " fun"],
    //   "title": "Another one",
    //   "snippet": "",
    //   "content": "Blah blah blah ginger lemon",
    //   "author": "pcofrancesco@makpar.com",
    //   "comments": [
    //     {
    //       "comment_id": 4,
    //       "news_id": 3,
    //       "author": "pcofrancesco@makpar.com",
    //       "parent_comment": null,
    //       "content": "it's a me, mario",
    //       "submitted": "2022-01-04",
    //       "is_author": true,
    //       "child_comments": [
    //         {
    //           "comment_id": 5,
    //           "news_id": 3,
    //           "author": "pcofrancesco@makpar.com",
    //           "parent_comment": 4,
    //           "content": "and luigi",
    //           "submitted": "2022-01-04",
    //           "is_author": true,
    //           "child_comments": []
    //         }
    //       ]
    //     }
    //   ]
    // }
      
    
    

    this.news.getNews(this.newsId).subscribe((data: NewsResponse) => {
      this.newsPost = data.results[0];
      // console.log(this.newsPost.comments)
    });
  }
}
