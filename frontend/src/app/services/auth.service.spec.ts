import { TestBed, waitForAsync } from '@angular/core/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { mock } from 'src/environments/mock';
import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';

let store : any= {};
const mockSessionStorage = {
  retrieve: (key: string): string => { return key in store ? store[key] : null; },
  store: (key: string, value: string): void=> { store[key] = `${value}`; },
  clear: (key: string): void => { delete store[key]; },
};

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let sessionService: SessionStorageService

  beforeAll(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule, 
      ],
      providers:[
        AuthService,
        { provide: SessionStorageService, useValue: mockSessionStorage }
      ]
    }).compileComponents();
  }));

  beforeAll(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionStorageService)
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login', ()=>{
    authService.login({ username: 'test', password: 'test'}).subscribe((token: Token)=>{
      expect(token).toEqual(mock.auth.token)
    })
    const req = httpTestingController.expectOne('/api/defaults/token');
    expect(req.request.method).toEqual('POST');
    req.flush(mock.auth.token);
    httpTestingController.verify();
  })
});
