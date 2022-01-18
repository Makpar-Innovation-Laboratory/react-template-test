import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { AppConfig } from 'src/config';
import { mockAuth, MockSessionStorage } from 'src/mock';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(waitForAsync(()=>{
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ 
        RouterTestingModule, 
        OverlayModule, 
        MaterialModule, 
        HttpClientTestingModule, 
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
      ],
      providers:[
        AuthService, 
        FormBuilder,
        { provide: SessionStorageService, useClass: MockSessionStorage }
      ]
    }).compileComponents();
  }));

  afterEach(()=>{
    httpTestingController.verify();
  })

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should set notifications form field to true by default', ()=>{
    expect(component.registerFormGroup.controls.notifications.value).toBeTrue();
  });

  it('should require non-null value in username form field', ()=>{
    component.registerFormGroup.controls.email.setValue('test');
    component.registerFormGroup.controls.business_name.setValue('test');
    component.registerFormGroup.controls.address.setValue('test');
    component.registerFormGroup.markAsTouched();
    expect(component.registerFormGroup.invalid).toBeTrue();
    expect(component.registerFormGroup.controls.username.hasError('required')).toBeTrue();
  });

  it('should require non-null value in email form field', ()=>{
    component.registerFormGroup.controls.username.setValue('test');
    component.registerFormGroup.controls.business_name.setValue('test');
    component.registerFormGroup.controls.address.setValue('test');
    component.registerFormGroup.markAsTouched();
    expect(component.registerFormGroup.invalid).toBeTrue();
    expect(component.registerFormGroup.controls.email.hasError('required')).toBeTrue();
  });

  it('should require non-null value in business_name form field', ()=>{
    component.registerFormGroup.controls.username.setValue('test');
    component.registerFormGroup.controls.email.setValue('test');
    component.registerFormGroup.controls.address.setValue('test');
    component.registerFormGroup.markAsTouched();
    expect(component.registerFormGroup.invalid).toBeTrue();
    expect(component.registerFormGroup.controls.business_name.hasError('required')).toBeTrue();
  });

  it('should require non-null value in address form field', ()=>{
    component.registerFormGroup.controls.username.setValue('test');
    component.registerFormGroup.controls.business_name.setValue('test');
    component.registerFormGroup.controls.email.setValue('test');
    component.registerFormGroup.markAsTouched();
    expect(component.registerFormGroup.invalid).toBeTrue();
    expect(component.registerFormGroup.controls.address.hasError('required')).toBeTrue();
  });

  it('should require non-null values in all form fields simultaneously', ()=>{
    component.registerFormGroup.markAsTouched();
    expect(component.registerFormGroup.invalid).toBeTrue();
    expect(component.registerFormGroup.controls.email.hasError('required')).toBeTrue();
    expect(component.registerFormGroup.controls.username.hasError('required')).toBeTrue();
    expect(component.registerFormGroup.controls.business_name.hasError('required')).toBeTrue();
    expect(component.registerFormGroup.controls.address.hasError('required')).toBeTrue();
    component.registerFormGroup.controls.username.setValue('test');
    component.registerFormGroup.controls.email.setValue('test@test.com')
    component.registerFormGroup.controls.business_name.setValue('test');
    component.registerFormGroup.controls.address.setValue('test');
    expect(component.registerFormGroup.valid).toBeTrue();
    expect(component.registerFormGroup.controls.email.hasError('required')).toBeFalse();
    expect(component.registerFormGroup.controls.username.hasError('required')).toBeFalse();
    expect(component.registerFormGroup.controls.business_name.hasError('required')).toBeFalse();
    expect(component.registerFormGroup.controls.address.hasError('required')).toBeFalse();
  });

  it('should pass info to AuthService and then confirm registration with MatDialog', ()=>{
    component.registerFormGroup.controls.email.setValue(mockAuth.decoded_payload.name);
    component.registerFormGroup.controls.username.setValue('soros');
    component.registerFormGroup.controls.business_name.setValue('illuminati');
    component.registerFormGroup.controls.address.setValue('moonbase');
    component.register();
    const req = httpTestingController.expectOne('/api/defaults/register');
    expect(req.request.method).toBe('POST')
    req.flush(true);
    fixture.detectChanges();
    const dialogContent = document.getElementById('dialog-content') as HTMLElement;
    expect(dialogContent.innerText).toEqual(AppConfig.registerMsg);
  });

});
