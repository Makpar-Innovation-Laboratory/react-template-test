import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HostService } from 'src/app/services/host.service';
import { MockService } from 'src/app/services/mock.service';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let newsService: NewsService;
  let hostService: HostService;
  let mockService: MockService;

  beforeAll(()=>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers:[
        HostService, 
        MockService,
      ]
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    hostService = TestBed.inject(HostService)
    mockService = TestBed.inject(MockService);
    newsService = TestBed.inject(NewsService);
  });

  it('should be created', () => {
    expect(newsService).toBeTruthy();
  });
});