import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { of } from 'rxjs';
import { HomeComponent } from './components/home/home.component';


describe('AppComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeAll(async ()=>{
    let store : any= {};
    const mockLocalStorage = {
      retrieve: (key: string): string => { return key in store ? store[key] : null; },
      store: (key: string, value: string): void=> { store[key] = `${value}`; },
      clear: (key: string): void => { delete store[key]; },
    };
    const mockActivateRoute = {
      snapshot: { url: { toString: () => { return '/'; } } }
    }
    spyOn(SessionStorageService, "retrieve" as never).and.callFake(mockLocalStorage.retrieve as never)
    spyOn(SessionStorageService, 'store' as never).and.callFake(mockLocalStorage.store as never)
    spyOn(SessionStorageService, 'clear' as never).and.callFake(mockLocalStorage.clear as never)

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{path: '', component: HomeComponent}]), 
                OverlayModule, MatDialogModule, 
                HttpClientTestingModule],
      providers: [
        AuthService, SessionStorageService, ActivatedRoute,
        { provide: ActivatedRoute, useValue: of(mockActivateRoute) },
      ]
    })
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Makpar Innovation Lab'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Makpar Innovation Lab');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('frontend app is running!');
  });
});
