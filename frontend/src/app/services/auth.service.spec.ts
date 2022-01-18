import { TestBed, waitForAsync } from '@angular/core/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { mockAuth, mockCredentials, MockSessionStorage, mockUser } from 'src/environments/mock';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Token } from '../models/token';
import { AppConfig, AppRoute } from 'src/config';
import { AuthInterceptor } from '../modules/shared/interceptors/auth.interceptor';

describe('AuthService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let sessionService: SessionStorageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule, 
      ],
      providers:[
        AuthService,
        { provide: SessionStorageService, useClass: MockSessionStorage },
        { provide: HTTP_INTERCEPTORS, multi: true, useClass: AuthInterceptor }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.inject(HTTP_INTERCEPTORS);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    sessionService = TestBed.inject(SessionStorageService);
  });

  afterEach(()=>{
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should log user in through backend API', ()=>{
    authService.login(mockCredentials).subscribe((token: Token)=>{
      expect(token).toEqual(mockAuth.token);
    })
    const req = httpTestingController.expectOne('/api/defaults/token');
    expect(req.request.method).toEqual('POST');
    req.flush(mockAuth.token);
  });

  it('should store token in browser session', ()=>{{
    authService.login(mockCredentials).subscribe((__: Token)=>{
      expect(authService.getUsername()).toBe(mockAuth.decoded_payload.name);
    })
    const req = httpTestingController.expectOne('/api/defaults/token');
    expect(req.request.method).toEqual('POST')
    req.flush(mockAuth.token);
  }});

  it('should register a user through backend API', ()=>{
    authService.register(mockUser).subscribe((data)=>{
      expect(data).toBeTrue();
    })
    const req = httpTestingController.expectOne('/api/defaults/register')
    expect(req.request.method).toEqual('POST');
    req.flush(true);
  });

  it('should determine user privileges through session', ()=>{
    sessionService.store('groups', 'developer');
    expect(authService.belongsToGroup('developer')).toBeTrue()
    expect(authService.belongsToGroup('client')).toBeFalse()
    sessionService.store('groups', 'client');
    expect(authService.belongsToGroup('developer')).toBeFalse();
    expect(authService.belongsToGroup('client')).toBeTrue();
  });

  it('should return route rendering based on user permissions', ()=>{
    sessionService.store('groups', 'developer');
    let testRoute: AppRoute = AppConfig.routes[6];
    expect(authService.displayRouteForUser(testRoute)).toBeTrue();
    sessionService.store('groups', 'client');
    expect(authService.displayRouteForUser(testRoute)).toBeFalse();
  });

  it('should verify a user is still logged', ()=>{
    sessionService.store('token', mockAuth.token.AuthenticationResult.IdToken);
    authService.verify().subscribe((verified: boolean)=>{
      expect(verified).toBe(true);
    });
    const req = httpTestingController.expectOne('/api/defaults/verify');
    expect(req.request.method).toEqual('GET');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')?.split(' ')[1]).toEqual(mockAuth.token.AuthenticationResult.IdToken);
    req.flush(true);
  });

});
