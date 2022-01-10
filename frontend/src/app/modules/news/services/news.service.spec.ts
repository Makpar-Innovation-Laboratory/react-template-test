import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HostService } from 'src/app/services/host.service';
import { StateService } from 'src/app/services/state.service';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;

  beforeAll(()=>{
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers:[
        HostService, StateService,
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
