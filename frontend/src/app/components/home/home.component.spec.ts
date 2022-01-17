import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SessionStorageService } from 'ngx-webstorage';
import { AnimationPeriods, FadeStates } from 'src/animations';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { AuthService } from 'src/app/services/auth.service';
import { HostService } from 'src/app/services/host.service';
import { AppConfig } from 'src/config';
import { mock } from 'src/environments/mock';

import { HomeComponent } from './home.component';

let store : any= {};
const mockSessionStorage = {
  retrieve: (key: string): string => { return key in store ? store[key] : null; },
  store: (key: string, value: string) => { store[key] = `${value}`; },
  clear: (key: string) => { delete store[key]; },
};

describe('HomeComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let hostService: HostService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        CommonModule,
        NoopAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: SessionStorageService, useValue: mockSessionStorage }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.inject(SessionStorageService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    hostService = TestBed.inject(HostService);
    // need to inject token into session before component is created in second test,
    // so cannot create component in this block; need to do it on every test.
  });

  it('should be created', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should retrieve username upon instantiation', () => {
    mockSessionStorage.store('username', mock.auth.decoded_payload.name)
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.username).toEqual(mock.auth.decoded_payload.name)
  });

  it('should should switch sections and set selection', fakeAsync(()=>{
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.onSelect(AppConfig.sections[1]);
    tick(AnimationPeriods.short*1000 + 5);
    expect(component.selected).toEqual(AppConfig.sections[1]);
    expect(component.isSelected(AppConfig.sections[1])).toBeTrue();
  }));

  it('should fade in and out as sections are switched', fakeAsync(()=>{
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    expect(component.sectionFadeState).toEqual(FadeStates.in);
    component.onSelect(AppConfig.sections[2]);
    expect(component.sectionFadeState).toEqual(FadeStates.out);
    tick(AnimationPeriods.short*1000+5);
    expect(component.sectionFadeState).toEqual(FadeStates.in);
  }));
});
