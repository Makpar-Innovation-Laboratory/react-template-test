import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { HostService } from 'src/app/services/host.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let hostService: HostService;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeAll(()=>{
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ 
        RouterTestingModule.withRoutes([{path: 'register', component: RegisterComponent}]), 
        OverlayModule, 
        MaterialModule, 
        HttpClientTestingModule, 
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers:[
        AuthService, 
        SessionStorageService, 
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    hostService = TestBed.inject(HostService);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
