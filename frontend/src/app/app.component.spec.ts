import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';


describe('AppComponent', () => {

  beforeAll(()=>{
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, OverlayModule, MatDialogModule],
      providers:[
        AuthService, SessionStorageService,
        { provide: HttpClient, useValue: httpClientSpy },
        { proivde: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: '' },
      ]
    })
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
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
