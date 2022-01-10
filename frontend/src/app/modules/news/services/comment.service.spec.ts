import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HostService } from 'src/app/services/host.service';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;

  beforeAll(()=>{
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    TestBed.configureTestingModule({
      providers:[
        HostService,
        { provide: HttpClient, useValue: httpClientSpy },
      ]
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
