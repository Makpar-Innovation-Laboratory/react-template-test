import { Injectable } from '@angular/core';
import { News, NewsResponse } from '../models/news';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private mockNews : NewsResponse = { results: [] }
  private mockComments: Comment[] = []

  constructor() { }

  public getMockComments(): Comment[] { return this.mockComments; }

  public setMockComments(newComments: Comment[]): void { this.mockComments = newComments; }

  public getMockNews(): NewsResponse { return this.mockNews; }
  
  public getMockNewsByID(id: number): NewsResponse{ return { results: [this.mockNews.results[id-1]] }}

  public addMockNews(news: News){ this.mockNews.results.push(news); }

  public getLatestMockNewsId(){ return this.mockNews.results.length; }

}
