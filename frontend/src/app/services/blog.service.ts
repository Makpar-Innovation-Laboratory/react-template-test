import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HostService } from './host.service';
import { Blog, BlogResponse } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


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
  public postBlog(blog: Blog): Observable<BlogResponse>{
    return this.http.post<BlogResponse>(`${this.host.getHost()}/news`, blog)
  }
  
  public getBlog(id: number): Observable<Blog>{
    return this.http.get<Blog>(`${this.host.getHost()}/news/${id}`)
  }
}