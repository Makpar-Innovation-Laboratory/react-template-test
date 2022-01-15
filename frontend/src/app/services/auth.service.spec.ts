import { TestBed, waitForAsync } from '@angular/core/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { mock } from 'src/environments/mock';
import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { AppRoute } from 'src/config';

let session : any= {};
const mockSessionStorage = {
  retrieve: (key: string): string => { return key in session ? session[key] : null; },
  store: (key: string, value: string): void=> { session[key] = `${value}`; },
  clear: (key: string): void => { delete session[key]; },
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

  it('should log user in through API', ()=>{
    authService.login({ username: 'test', password: 'test'}).subscribe((token: Token)=>{
      expect(token).toEqual(mock.auth.token)
    })
    const req = httpTestingController.expectOne('/api/defaults/token');
    expect(req.request.method).toEqual('POST');
    req.flush(mock.auth.token);
    httpTestingController.verify();
  })

  it('should determine user privileges through session', ()=>{
    mockSessionStorage.store('groups', 'developer')
    expect(authService.belongsToGroup('developer')).toBe(true);
    expect(authService.belongsToGroup('client')).toBe(false);
    mockSessionStorage.store('groups', 'client')
    expect(authService.belongsToGroup('developer')).toBe(false);
    expect(authService.belongsToGroup('client')).toBe(true);
  })

  it('should return route rendering based on user permissions', ()=>{
    mockSessionStorage.store('groups', 'developer')
    let testRoute = { route: '/admin', title: 'ADMIN', tooltip: "Administrative Access to Site", dev: true }
    expect(authService.displayRouteForUser(testRoute)).toBe(true);
    mockSessionStorage.store('groups', 'client')
    expect(authService.displayRouteForUser(testRoute)).toBe(false);
  })
});
