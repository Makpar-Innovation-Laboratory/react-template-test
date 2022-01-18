import { TestBed } from '@angular/core/testing';

import { MockService } from './mock.service';
import { News, NewsResponse, NULL_NEWS } from 'src/app/models/news'
import { MockNews} from 'src/environments/mock';

describe('MockService', () => {
  let mockService: MockService;
  let news : MockNews = new MockNews();

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
    mockService.addMockNews(news.mockNews);
    expect(mockService.getMockNews().results.length).toBe(3);
    expect(mockService.getMockNewsByID(news.getNewsId() as number)).toEqual(news.getNewsResponse());
    expect(mockService.getLatestMockNewsId()).toEqual(news.getNewsId() as number)
  });

  // TODO: THIS!!
  // it('should mock backend API comment functionality', ()=>{
  // });
});
