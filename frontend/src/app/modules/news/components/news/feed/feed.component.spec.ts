import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/auth.service';

import { FeedComponent } from './feed.component';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  beforeAll(()=>{
    let store : any= {};
    const mockLocalStorage = {
      retrieve: (key: string): string => { return key in store ? store[key] : null; },
      store: (key: string, value: string) => { store[key] = `${value}`; },
      clear: (key: string) => { delete store[key]; },
    };
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    spyOn(SessionStorageService, 'retrieve' as never).and.callFake(mockLocalStorage.retrieve as never)
    spyOn(SessionStorageService, 'store' as never).and.callFake(mockLocalStorage.store as never)
    spyOn(SessionStorageService, 'clear' as never).and.callFake(mockLocalStorage.clear as never)
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers:[
        AuthService, SessionStorageService,
        { provide: HttpClient, useValue: httpClientSpy },
        { proivde: Router, useValue: routerSpy },
      ]
    })
  });
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
