import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { of } from 'rxjs';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './modules/shared/material.module';
import { HostService } from './services/host.service';

let store : any= {};
const mockLocalStorage = {
  retrieve: (key: string): string => { return key in store ? store[key] : null; },
  store: (key: string, value: string): void=> { store[key] = `${value}`; },
  clear: (key: string): void => { delete store[key]; },
};
const mockActivateRoute = {
  snapshot: { url: { toString: () => { return '/'; } } }
}
const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let hostService: HostService;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(waitForAsync(()=>{
    spyOn(SessionStorageService, 'retrieve' as never).and.callFake(mockLocalStorage.retrieve as never)
    spyOn(SessionStorageService, 'store' as never).and.callFake(mockLocalStorage.store as never)
    spyOn(SessionStorageService, 'clear' as never).and.callFake(mockLocalStorage.clear as never)

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
        ActivatedRoute, 
        AuthService,
        HostService,
        { provide: ActivatedRoute, useValue: of(mockActivateRoute) },
        { provide: Router, useValue: routerSpy },
      ]
    }).compileComponents()
  }));

  beforeEach(()=>{
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

  it(`should have as title 'Makpar Innovation Lab'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Makpar Innovation Lab');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('frontend app is running!');
  });
});
