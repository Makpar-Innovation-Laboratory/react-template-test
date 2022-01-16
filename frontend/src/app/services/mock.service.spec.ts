import { TestBed } from '@angular/core/testing';

import { MockService } from './mock.service';
import { NULL_NEWS } from 'src/app/models/news'
import { TEST_NEWS, TEST_ID, TEST_RESULT } from 'src/environments/mock';

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
    mockService.addMockNews(TEST_NEWS);
    expect(mockService.getMockNews().results.length).toBe(3);
    expect(mockService.getMockNewsByID(TEST_ID)).toEqual(TEST_RESULT);
    expect(mockService.getLatestMockNewsId()).toEqual(TEST_ID)
  });

  // TODO: THIS!!
  // it('should mock backend API comment functionality', ()=>{
  // });
});
