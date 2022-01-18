import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { EditorModes } from 'src/config';
import { MockActivatedRoute, MockNews, MockSanitizer } from 'src/mock';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let activatedRoute: ActivatedRoute;
  let sanitizer: DomSanitizer;
  let news : MockNews = new MockNews();

  beforeEach(()=>{
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ], 
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule,
        OverlayModule, 
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        AngularEditorModule,
        NoopAnimationsModule
      ],
      providers:[
        NewsService, 
        FormBuilder, 
        { provide: DomSanitizer, useClass: MockSanitizer },
        { provide: ActivatedRoute, useFactory: () => { return new MockActivatedRoute("admin/update", 1); } },
      ]
    })
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  // SOME TESTS REQUIRE A DIFFERENT ACTIVATED ROUTE, SO SOME OF THE TEST CONFIGURATION HAS TO GO 
  //  WITHIN THE 'IT' BLOCK ITSELF IN ORDER TO PROVIDE A DIFFERENT PROVIDER FOR DEPENDENCY INJECTION.
  it('should initialized with backend data', async () => {
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    sanitizer = TestBed.inject(DomSanitizer);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne(`/api/news/post/${activatedRoute.snapshot.params.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(news.getNewsResponse());
  });

  it('should initialize form group with data from backend API if activated route is admin/update/:id', async()=>{
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    sanitizer = TestBed.inject(DomSanitizer);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne(`/api/news/post/${activatedRoute.snapshot.params.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(news.getNewsResponse());
    expect(component.newsFormGroup.controls.title.value).toEqual(news.mockNews.title);
    expect(component.newsFormGroup.controls.subject.value).toEqual(news.mockNews.subject);
    expect(component.newsFormGroup.controls.snippet.value).toEqual(news.mockNews.snippet);
    expect(component.newsFormGroup.controls.content.value).toEqual(news.mockNews.content);
  })

  it('should initialize in editing mode if activated route is admin/update/:id', async()=>{
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    sanitizer = TestBed.inject(DomSanitizer);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mode).toBe(EditorModes.edit);
    const req = httpTestingController.expectOne(`/api/news/post/${activatedRoute.snapshot.params.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(news.getNewsResponse());
  });

  it('should post update to backend if activated route is admin/update/:id', async()=>{
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    sanitizer = TestBed.inject(DomSanitizer);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const initReq = httpTestingController.expectOne(`/api/news/post/${activatedRoute.snapshot.params.id}`);
    expect(initReq.request.method).toBe('GET');
    initReq.flush(news.getNewsResponse());
    component.newsFormGroup.controls.content.setValue('updated content');
    component.submit()
    const updateReq = httpTestingController.expectOne(`/api/news/post/${activatedRoute.snapshot.params.id}`);
    expect(updateReq.request.method).toBe('PUT')
    updateReq.flush(news.getNewsResponse());
  });


  //TODO: test snackbar opening for admin/update/:id

  it('should require non-null form fields', async()=>{
    TestBed.overrideProvider(ActivatedRoute, {useFactory: () =>{return new MockActivatedRoute('admin/add' ); } });
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    sanitizer = TestBed.inject(DomSanitizer);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.newsFormGroup.markAsTouched();
    expect(component.newsFormGroup.controls.title.hasError('required')).toBeTrue();
    expect(component.newsFormGroup.controls.subject.hasError('required')).toBeTrue();
    expect(component.newsFormGroup.controls.snippet.hasError('required')).toBeTrue();
    expect(component.newsFormGroup.controls.content.hasError('required')).toBeTrue();
    component.newsFormGroup.controls.title.setValue(news.mockNews.title);
    component.newsFormGroup.controls.subject.setValue(news.mockNews.subject);
    component.newsFormGroup.controls.snippet.setValue(news.mockNews.snippet);
    component.newsFormGroup.controls.content.setValue(news.mockNews.content);
    expect(component.newsFormGroup.controls.title.hasError('required')).toBeFalse();
    expect(component.newsFormGroup.controls.subject.hasError('required')).toBeFalse();
    expect(component.newsFormGroup.controls.snippet.hasError('required')).toBeFalse();
    expect(component.newsFormGroup.controls.content.hasError('required')).toBeFalse();
  })

  it('should have null form group if activated route is admin/add', async()=>{
    TestBed.overrideProvider(ActivatedRoute, {useFactory: () =>{return new MockActivatedRoute('admin/add' ); } });
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    sanitizer = TestBed.inject(DomSanitizer);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.newsFormGroup.controls.title.value).toBeFalsy();
    expect(component.newsFormGroup.controls.subject.value).toBeFalsy();
    expect(component.newsFormGroup.controls.snippet.value).toBeFalsy();
    expect(component.newsFormGroup.controls.content.value).toBeFalsy();
  })

  // test mode initialization
  it('should initialize in create mode if activated route is admin/add', async()=>{
    TestBed.overrideProvider(ActivatedRoute, {useFactory: () =>{return new MockActivatedRoute('admin/add' ); } });
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    sanitizer = TestBed.inject(DomSanitizer);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mode).toBe(EditorModes.new);
  })
});
