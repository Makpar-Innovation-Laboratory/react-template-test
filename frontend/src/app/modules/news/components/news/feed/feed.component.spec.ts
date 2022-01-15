import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { SessionStorageService } from 'ngx-webstorage';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { HostService } from 'src/app/services/host.service';
import { NewsService } from '../../../services/news.service';
import { StoryComponent } from '../story/story.component';

import { FeedComponent } from './feed.component';

let store : any= {};
const mockSessionStorage = {
  retrieve: (key: string): string => { return key in store ? store[key] : null; },
  store: (key: string, value: string) => { store[key] = `${value}`; },
  clear: (key: string) => { delete store[key]; },
};

describe('FeedComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let newsService: NewsService;
  let sessionService: SessionStorageService;
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  // Configure testing bed with component specific imports
  beforeAll(waitForAsync(()=>{
    TestBed.configureTestingModule({
      declarations: [ FeedComponent ],
      imports: [ 
        RouterTestingModule.withRoutes([
          { path: 'feed', component: FeedComponent }, 
          { path: ':id', component: StoryComponent }
        ]), 
        HttpClientTestingModule, 
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
      ],
      providers:[
        AuthService, 
        NewsService, 
        { provide: SessionStorageService, useValue: mockSessionStorage },
      ]
    }).compileComponents()
  }));

  // Inject component dependencies into TestBed
  beforeAll(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    newsService = TestBed.inject(NewsService)
    sessionService = TestBed.inject(SessionStorageService)
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should make an API call on initialization', () => {
    const req = httpTestingController.expectOne('/api/news');
    expect(component).toBeTruthy();
  });
});
