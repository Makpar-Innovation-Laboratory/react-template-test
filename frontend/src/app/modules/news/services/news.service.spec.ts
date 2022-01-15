import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { NewsPostResponse, NewsResponse, NULL_NEWS, NULL_NEWS_POST_RESPONSE, NULL_NEWS_RESPONSE } from 'src/app/models/news';
import { HostService } from 'src/app/services/host.service';
import { MockService } from 'src/app/services/mock.service';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let newsService: NewsService;
  let hostService: HostService;
  let mockService: MockService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(()=>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers:[
        HostService, 
        MockService,
      ]
    })
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    hostService = TestBed.inject(HostService)
    mockService = TestBed.inject(MockService);
    newsService = TestBed.inject(NewsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(newsService).toBeTruthy();
  });

  it('should post news to the backend API', ()=>{
    newsService.postNews(NULL_NEWS).subscribe((response: NewsPostResponse)=>{
      expect(response).toEqual(NULL_NEWS_POST_RESPONSE);
    })
    const req = httpTestingController.expectOne('/api/news/')
    expect(req.request.method).toEqual('POST')
    req.flush(NULL_NEWS_POST_RESPONSE);
  });

  it('should get all news from the backend API', ()=>{
    newsService.getAllNews().subscribe((news: NewsResponse)=>{
      expect(news).toEqual(NULL_NEWS_RESPONSE);
    })
    const req = httpTestingController.expectOne('/api/news')
    expect(req.request.method).toEqual('GET');
    req.flush(NULL_NEWS_RESPONSE)
  });
  
});