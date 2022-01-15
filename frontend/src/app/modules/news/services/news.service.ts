import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { HostService } from '../../../services/host.service';
import { News, NewsPostResponse, NewsResponse } from '../../../models/news';
import { environment } from 'src/environments/environment';
import { MockService } from 'src/app/services/mock.service';

/**
 * # NewsService
 * ## Description
 * ## Example Usage
 * ```javascript
 * constructor(private news : NewsService)
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class NewsService {

  /**
   * # Description
   * Construct an instance of {@link NewsService}
   * @param http {@link HTTPClient} for service calls
   * @param host {@link HostService} for retrieving the API host
   * @param mock {@link MockService} for persisting data in memory during the application execution
   */
  constructor(private http: HttpClient, 
              private host: HostService,
              private mock: MockService) { }

  /**
   * # Description
   * Posts a {@link News} story to the Innovation Lab API
   * @param news {@link News} to be posted
   * @returns observable containing {@link NewsPostResponse}
   */
  public postNews(news: News): Observable<NewsPostResponse>{
    // NOTE: posts must end in trailing slash
    if(environment.mock){
      this.mock.addMockNews(news);
      return of({ id: this.mock.getLatestMockNewsId(), message: 'News Story Saved'})
    }
    else return this.http.post<NewsPostResponse>(`${this.host.getHost()}/news/`, news)
  }
  
  /**
   * # Description
   * Retrieve a news story from the Innovation Lab API
   * @param id id of the {@link News} story to retrieve
   * @returns observable containing {@link NewsResponse}
   */
  public getNews(id: number): Observable<NewsResponse>{
    if(environment.mock) return of(this.mock.getMockNewsByID(id))
    else return this.http.get<NewsResponse>(`${this.host.getHost()}/news/post/${id}`)
  }

  /**
   * # Description
   * Delete a news story from the Innovaiton Lab API
   * @param id id of the {@link News} story to delete
   * @returns observable containing {@link NewsPostResponse}
   */
  public deleteNews(id: number): Observable<NewsPostResponse>{
    // TODO: mock implementation
    return this.http.delete<NewsPostResponse>(`${this.host.getHost()}/news/post/${id}`)
  }

  /**
   * # Description
   * Update a news story from the Innovation Lab API
   * @param id id of the {@link News} story to update
   * @returns observable containing {@link NewsPostResponse}
   */
  public updateNews(id: number, news: News): Observable<NewsPostResponse>{
    // TODO: mock implementation
    return this.http.put<NewsPostResponse>(`${this.host.getHost()}/news/post/${id}`, news)
  }

  /**
   * # Description
   * Retrieve all new stories form the Innovation Lab API
   * @returns observable containing {@link NewsResponse}
   */
  public getAllNews(): Observable<NewsResponse>{
    if(environment.mock) {
      return of(this.mock.getMockNews())}
    else return this.http.get<NewsResponse>(`${this.host.getHost()}/news`)
  }

  public flagComment(id: number, comment: Comment): Observable<NewsPostResponse>{
    // TODO: mock implementation
    return this.http.put<NewsPostResponse>(`${this.host.getHost()}/news/comment/${id}`, comment)
  }

}