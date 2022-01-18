import { TestBed } from '@angular/core/testing';

import { MockService } from './mock.service';
import { News, NewsResponse, NULL_NEWS } from 'src/app/models/news'
import { mockNews} from 'src/environments/mock';

describe('MockService', () => {
  let mockService: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    mockService = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(mockService).toBeTruthy();
  });

  it('should mock backend API news functionality', () =>{
    mockService.addMockNews(NULL_NEWS);
    expect(mockService.getMockNews().results.length).toBe(1);
    mockService.addMockNews(NULL_NEWS);
    expect(mockService.getMockNews().results.length).toBe(2);
    mockService.addMockNews(mockNews.news);
    expect(mockService.getMockNews().results.length).toBe(3);
    expect(mockService.getMockNewsByID(mockNews.news_id)).toEqual(mockNews.news_response as NewsResponse);
    expect(mockService.getLatestMockNewsId()).toEqual(mockNews.news_id)
  });

  // TODO: THIS!!
  // it('should mock backend API comment functionality', ()=>{
  // });
});
