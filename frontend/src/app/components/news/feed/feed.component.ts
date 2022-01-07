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
  public p: number = 1;

  // fetchedData: News[] = [];
  // displayedData: News[] = [];
  // itemsPerPage: number = 3;
  // allPages!: number;

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
      console.log(thisNews.results)
      this.feed = thisNews.results;
      console.log(thisNews.results);
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


    // onPageChange(page: number = 1): void {
    //   const startItem = (page - 1) * this.itemsPerPage;
    //   const endItem = page * this.itemsPerPage;
    //   this.displayedData = this.feed.slice(startItem, endItem);
    // }

}
