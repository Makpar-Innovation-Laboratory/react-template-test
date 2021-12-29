import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Token } from '../models/token';
import { HostService } from './host.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private add_blog_url:string = `${this.host.getHost()}/news/`;
  private get_all_blogs_url:string = `${this.host.getHost()}/news`;
  private get_single_blog_url:string = 'https://api-innolab-dev.makpar-innovation.net/news/';
  private delete_blog_url:string = 'http://localhost:5000/delete_blog/';
  private update_blog_url:string = 'http://localhost:5000/update_blog/';
  // token = localStorage.getItem('token');
  // authStr = 'Bearer ' + String(this.token)
  // headers = new HttpHeaders()
  //   .set('Authorization', this.authStr)

  constructor(private http:HttpClient, private host: HostService) { }

  public add_blog(blog_props:Object):Observable<Token>{
    return this.http.post<Token>(this.add_blog_url,blog_props);
  }

  public get_all_blogs():Observable<Token>{
    return this.http.get<Token>(this.get_all_blogs_url);
  }

  public get_single_blog(blog_id:string):Observable<Token>{
    return this.http.get<Token>(this.get_single_blog_url + blog_id);
  }

  update_blog(blog_props: Object, blog_id:string){
    return this.http.put(this.update_blog_url + blog_id, blog_props);
  }

  delete_blog(id:string){
    return this.http.delete(this.delete_blog_url + id);
  }
}