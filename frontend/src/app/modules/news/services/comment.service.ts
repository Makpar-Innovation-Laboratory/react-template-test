import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment, CommentPostResponse } from '../../../models/news';
import { HostService } from '../../../services/host.service';
import {formatDate} from '@angular/common';
/**
 * # CommentService
 * ## Description
 * ## Example Usage
 * ```javascript
 * constructor(private comments: CommentService)
 * ```
 */
@Injectable({
  providedIn: 'any'
})
export class CommentService {

  private mockComments : Comment[] = []
  content!: object
  /**
* # Description
   * Construct an instance of {@link CommentService}
   * @param http {@link HTTPClient} for service calls
   * @param host {@link HostService} for retrieving the API host
   */
  constructor(private http: HttpClient,
              private host: HostService) { }

  /**
   * # Description
   * Posts a {@link Comment} to a {@link News} story on the Innovation Lab API
   * @param news {@link News} to be posted
   * @returns observable containing {@link NewsPostResponse}
   */
   public postComment(comment: Comment){
    // NOTE: posts must end in trailing slash
    if (comment.parent_comment === null){
      this.content = {
        news_id: comment.news_id,
        submitted: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        content: comment.content
      }
    } else {
      this.content = {
        news_id: comment.news_id,
        submitted: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        content: comment.content,
        parent_comment: comment.parent_comment
      }
    }
    
    if(environment.mock){
      this.mockComments.push(comment);
      return of({ id: this.mockComments.length, message: 'News Story Saved'})
    }
    else return this.http.post<CommentPostResponse>(`${this.host.getHost()}/news/post-comment`, this.content)
  }
}
