import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HostService } from 'src/app/services/host.service';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;

  beforeAll(()=>{
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers:[
        HostService
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
