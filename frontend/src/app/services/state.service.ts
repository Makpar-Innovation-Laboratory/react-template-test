import { Injectable } from '@angular/core';
import { News, NewsResponse } from '../models/news';

/**
 * # StateService
 * ## Description
 * Singleton service for persisting data in memory during the execution of the **Angular** application in the client browser. All properties passed into this service will remain accessible during the duration of a *single* page load, i.e., if the browser refreshes, the variables in this class will reset.
 */
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
