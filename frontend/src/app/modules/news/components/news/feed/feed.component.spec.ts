import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { HostService } from 'src/app/services/host.service';
import { NewsService } from '../../../services/news.service';

import { FeedComponent } from './feed.component';

let store : any= {};
const mockSessionStorage = {
  retrieve: (key: string): string => { return key in store ? store[key] : null; },
  store: (key: string, value: string) => { store[key] = `${value}`; },
  clear: (key: string) => { delete store[key]; },
};
const mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);
const mockHTTP = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);

describe('FeedComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let hostService: HostService;
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeEach(()=>{
    spyOn(SessionStorageService, 'retrieve' as never).and.callFake(mockSessionStorage.retrieve as never)
    spyOn(SessionStorageService, 'store' as never).and.callFake(mockSessionStorage.store as never)
    spyOn(SessionStorageService, 'clear' as never).and.callFake(mockSessionStorage.clear as never)
    TestBed.configureTestingModule({
      declarations: [ FeedComponent ],
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule, 
        MaterialModule
      ],
      providers:[
        AuthService, 
        NewsService, 
        { provide: SessionStorageService, useValue: mockSessionStorage},
        { provide: HttpClient, useValue: mockHTTP },
        { proivde: Router, useValue: mockRouter },
      ]
    }).compileComponents()
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    hostService = TestBed.inject(HostService);
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
