
import { NewsService } from '../../../services/news.service';
import { Component, OnInit, } from '@angular/core';
import { News, NewsPostResponse, NewsResponse } from 'src/app/models/news';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  public feed : News[] = [];

  /**
   * ## Description
   * Construct an instance of {@link ArchiveComponent}.
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
 

  /**
   * # Description
   * Delete a news story from the Innovation Lab API
   * @param id id of the {@link News} story to be deleted
   */
  public deleteNews(id: number): void{
    this.news.deleteNews(id).subscribe((__: NewsPostResponse)=>{
      return 
    })
  }

}