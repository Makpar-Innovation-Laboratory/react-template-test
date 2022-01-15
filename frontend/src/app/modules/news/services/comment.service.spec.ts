import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HostService } from 'src/app/services/host.service';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let commentService: CommentService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(waitForAsync(()=>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers:[
        HostService
      ]
    })
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    commentService = TestBed.inject(CommentService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpTestingController.verify();
  })
  
  it('should be created', () => {
    expect(commentService).toBeTruthy();
  });
});
