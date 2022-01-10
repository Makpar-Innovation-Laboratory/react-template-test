import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, } from 'rxjs';
import { HostService } from '../../../services/host.service';
import { News, NewsPostResponse, NewsResponse } from '../../../models/news';
import { environment } from 'src/environments/environment';
import { StateService } from 'src/app/services/state.service';

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
   * @param state {@link StateService} for persisting data in memory during the application execution
   */
  constructor(private http: HttpClient, 
              private host: HostService,
              private state: StateService) { }

  /**
   * # Description
   * Posts a {@link News} story to the Innovation Lab API
   * @param news {@link News} to be posted
   * @returns observable containing {@link NewsPostResponse}
   */
  public postNews(news: News): Observable<NewsPostResponse>{
    // NOTE: posts must end in trailing slash
    if(environment.mock){
      this.state.addMockNews(news);
      return of({ id: this.state.getLatestMockNewsId(), message: 'News Story Saved'})
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
    if(environment.mock) return of(this.state.getMockNewsByID(id))
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
      return of(this.state.getMockNews())}
    else return this.http.get<NewsResponse>(`${this.host.getHost()}/news`)
  }

}