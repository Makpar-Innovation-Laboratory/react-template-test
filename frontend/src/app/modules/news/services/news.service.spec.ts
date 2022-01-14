import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HostService } from 'src/app/services/host.service';
import { StateService } from 'src/app/services/state.service';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let service: NewsService;

  beforeAll(()=>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers:[
        HostService, StateService,
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
