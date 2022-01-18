import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { isExpressionFactoryMetadata } from '@angular/compiler/src/render3/r3_factory';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { HostService } from 'src/app/services/host.service';
import { mockAuth, MockSessionStorage } from 'src/mock';

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
        FormBuilder,
        { provide: SessionStorageService, useClass: MockSessionStorage },
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

  it('should require simultaneous non-null values in both form fields simultaneously', ()=>{
    component.loginFormGroup.markAsTouched();
    expect(component.loginFormGroup.invalid);
    expect(component.loginFormGroup.controls.email.hasError('required')).toBeTrue();
    expect(component.loginFormGroup.controls.password.hasError('required')).toBeTrue();
    component.loginFormGroup.controls.email.setValue('test@email');
    component.loginFormGroup.controls.password.setValue('test');
    expect(component.loginFormGroup.controls.email.hasError('required')).toBeFalse();
    expect(component.loginFormGroup.controls.password.hasError('required')).toBeFalse();
    expect(component.loginFormGroup.valid).toBeTrue();

  });

  it('should require valid emails', ()=>{
    component.loginFormGroup.controls.password.setValue('test')
    component.loginFormGroup.controls.email.setValue('invalidemail')
    component.loginFormGroup.markAsTouched();
    expect(component.loginFormGroup.invalid).toBeTrue();
    expect(component.loginFormGroup.controls.email.hasError('email')).toBeTrue();
  });

  it('should pass credentials to AuthService', ()=>{
    component.loginFormGroup.controls.email.setValue(mockAuth.decoded_payload.name);
    component.loginFormGroup.controls.password.setValue('fakepassword');
    component.login();
    const req = httpTestingController.expectOne('/api/defaults/token');
    expect(req.request.method).toEqual('POST')
    req.flush(mockAuth.token);
  })
});
