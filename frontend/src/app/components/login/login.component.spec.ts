import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { HostService } from 'src/app/services/host.service';
import { mock } from 'src/environments/mock';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let hostService: HostService;
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(()=>{
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [  
        RouterTestingModule.withRoutes([{path: 'login', component: LoginComponent}]), 
        HttpClientTestingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers:[
        AuthService, 
        SessionStorageService, 
        FormBuilder
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    hostService = TestBed.inject(HostService);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should require non-null value in username form field', ()=>{
    component.loginFormGroup.controls.password.setValue('test');
    component.loginFormGroup.markAsTouched();
    expect(component.loginFormGroup.invalid).toBeTrue();
    expect(component.loginFormGroup.controls.email.hasError('required')).toBeTrue();
  });

  it('should require non-null value in password form field', ()=>{
    component.loginFormGroup.controls.email.setValue('test');
    component.loginFormGroup.markAsTouched();
    expect(component.loginFormGroup.invalid).toBeTrue();
    expect(component.loginFormGroup.controls.password.hasError('required')).toBeTrue();
  })

  it('should require simultaneous non-null values in both form fields', ()=>{
    component.loginFormGroup.markAsTouched();
    expect(component.loginFormGroup.invalid);
    expect(component.loginFormGroup.controls.email.hasError('required')).toBeTrue();
    expect(component.loginFormGroup.controls.password.hasError('required')).toBeTrue();
  });

  it('should require valid emails', ()=>{
    component.loginFormGroup.controls.password.setValue('test')
    component.loginFormGroup.controls.email.setValue('invalidemail')
    component.loginFormGroup.markAsTouched();
    expect(component.loginFormGroup.invalid).toBeTrue();
    expect(component.loginFormGroup.controls.email.hasError('email')).toBeTrue();
  });

  it('should pass credentials to AuthService', ()=>{
    component.loginFormGroup.controls.email.setValue(mock.auth.decoded_payload.name);
    component.loginFormGroup.controls.password.setValue('fakepassword');
    component.login();
    const req = httpTestingController.expectOne('/api/defaults/token');
    expect(req.request.method).toEqual('POST')
    req.flush(mock.auth.token);
  })
});
