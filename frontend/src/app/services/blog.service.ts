import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HostService } from './host.service';
import { Blog, BlogPostResponse, BlogResponse } from '../models/blog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  private mock_blogs: BlogResponse = {
      results: []
  }
  /**
   * 
   * @param http HTTPClient for service calls
   * @param host Service for retrieving the API host
   */
  constructor(private http:HttpClient, 
              private host: HostService) { }

  /**
   * Posts a blog to the backend API
   * @param blog blog to be posted
   * @returns observable containing the blog response
   */
  public postBlog(blog: Blog): Observable<BlogPostResponse>{
    // NOTE: posts must end in trailing slash
    if(environment.mock){
      this.mock_blogs.results.push(blog);
      return of({ id: this.mock_blogs.results.length, message: 'Blog Saved'})
    }
    else return this.http.post<BlogPostResponse>(`${this.host.getHost()}/news/`, blog)
  }
  
  public getBlog(id: number): Observable<BlogResponse>{
    if(environment.mock) return of({ results: [this.mock_blogs.results[id-1]] })
    else return this.http.get<BlogResponse>(`${this.host.getHost()}/news/post/${id}`)
  }

  public getBlogs(): Observable<BlogResponse>{
    if(environment.mock) return of(this.mock_blogs)
    else return this.http.get<BlogResponse>(`${this.host.getHost()}/news`)
  }
}