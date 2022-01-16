import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './modules/shared/material.module';
import { HostService } from './services/host.service';
import { of } from 'rxjs';
import { AppConfig } from 'src/config';

let store : any= {};
const mockSessionStorage = {
  retrieve: (key: string): string => { return key in store ? store[key] : null; },
  store: (key: string, value: string): void=> { store[key] = `${value}`; },
  clear: (key: string): void => { delete store[key]; },
};
const mockActivateRoute = { 
  snapshot: { 
    url: { 
      toString: () => { 
        return '/'; 
      } 
    },
  } 
};

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let hostService: HostService;
  let sessionService: SessionStorageService;
  let fixture: ComponentFixture<AppComponent>;

  // Configure testing bed with component specific imports
  beforeEach(waitForAsync(()=>{
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        RouterTestingModule.withRoutes([{path: '', component: HomeComponent}]), 
        HttpClientTestingModule,
        OverlayModule, 
        MaterialModule, 
      ],
      providers: [
        SessionStorageService, 
        AuthService,
        HostService,
        { provide: ActivatedRoute, useValue: mockActivateRoute },
        { provide: SessionStorageService, useValue: mockSessionStorage },

      ]
    }).compileComponents()
  }));

  // Inject component dependencies into TestBed
  beforeEach(()=>{
    TestBed.inject(Router);
    TestBed.inject(ActivatedRoute)
    sessionService = TestBed.inject(SessionStorageService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    hostService = TestBed.inject(HostService);
    fixture = TestBed.createComponent(AppComponent);
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title "Makpar Innovation Lab"', () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Makpar Innovation Lab');
  });

  it('should switch active tabs when user clicks on link', ()=>{
    const app = fixture.componentInstance;
    let firstRoute = AppConfig.routes[1];
    let secondRoute = AppConfig.routes[0];
    app.onSelect(firstRoute.route);
    expect(app.activeRoute(firstRoute)).toBeTruthy()
    expect(app.activeRoute(secondRoute)).toBeFalsy();
    app.onSelect(secondRoute.route);
    expect(app.activeRoute(firstRoute)).toBeFalsy();
    expect(app.activeRoute(secondRoute)).toBeTruthy();
  })
});
