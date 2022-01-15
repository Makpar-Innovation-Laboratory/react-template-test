import { TestBed, waitForAsync } from '@angular/core/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { mock } from 'src/environments/mock';
import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token';
import { AppConfig, AppRoute } from 'src/config';
import { User, UserLogin } from 'src/app/models/user';

let session : any= {};
const mockSessionStorage = {
  retrieve: (key: string): string => { return key in session ? session[key] : null; },
  store: (key: string, value: string): void=> { session[key] = `${value}`; },
  clear: (key: string): void => { delete session[key]; },
};
const mockUser: User = {
  username: 'test', email: 'test', business_name: 'test',
  address: 'test', notifications: true
}
const mockCredentials: UserLogin = {
  username: 'test', password: 'test'
}

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

  afterEach(()=>{
    httpTestingController.verify()
  })

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log user in through backend API', ()=>{
    authService.login(mockCredentials).subscribe((token: Token)=>{
      expect(token).toEqual(mock.auth.token)
    })
    const req = httpTestingController.expectOne('/api/defaults/token');
    expect(req.request.method).toEqual('POST');
    req.flush(mock.auth.token);
  });

  it('should store token in browser session', ()=>{{
    authService.login(mockCredentials).subscribe((__: Token)=>{
      expect(authService.getUsername()).toBe(mock.auth.decoded_payload.name)
    })
    const req = httpTestingController.expectOne('/api/defaults/token');
    expect(req.request.method).toEqual('POST')
    req.flush(mock.auth.token);
  }});

  it('should register a user through backend API', ()=>{
    authService.register(mockUser).subscribe((data)=>{
      expect(data).toBe(true);
    })
    const req = httpTestingController.expectOne('/api/defaults/register')
    expect(req.request.method).toEqual('POST')
    req.flush(true);
  });

  it('should determine user privileges through session', ()=>{
    mockSessionStorage.store('groups', 'developer')
    expect(authService.belongsToGroup('developer')).toBe(true);
    expect(authService.belongsToGroup('client')).toBe(false);
    mockSessionStorage.store('groups', 'client')
    expect(authService.belongsToGroup('developer')).toBe(false);
    expect(authService.belongsToGroup('client')).toBe(true);
  });

  it('should return route rendering based on user permissions', ()=>{
    mockSessionStorage.store('groups', 'developer')
    let testRoute: AppRoute = AppConfig.routes[6]
    expect(authService.displayRouteForUser(testRoute)).toBe(true);
    mockSessionStorage.store('groups', 'client')
    expect(authService.displayRouteForUser(testRoute)).toBe(false);
  });

});
