import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/services/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeAll(()=>{
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    TestBed.configureTestingModule({
      providers:[
        AuthService, SessionStorageService,
        { provide: HttpClient, useValue: httpClientSpy },
        { proivde: Router, useValue: routerSpy },
      ]
    })
  });
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
