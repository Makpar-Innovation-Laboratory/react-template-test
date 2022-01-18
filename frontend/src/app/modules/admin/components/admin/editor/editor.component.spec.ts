import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { EditorModes } from 'src/config';
import { MockActivatedRoute, MockNews } from 'src/environments/mock';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let activatedRoute: ActivatedRoute;
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
        DomSanitizer,
        { provide: ActivatedRoute, useFactory: () => { return new MockActivatedRoute("admin/update", 1); } },
      ]
    })
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should initialized with backend data', async () => {
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne(`/api/news/post/${activatedRoute.snapshot.params.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(news.getNewsResponse());
  });

  it('should initialize form group if activated route is admin/update/:id', async()=>{
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
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

  it('should initialize in editing mode if activated route is admin/update', async()=>{
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.mode).toBe(EditorModes.edit);
    const req = httpTestingController.expectOne(`/api/news/post/${activatedRoute.snapshot.params.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(news.getNewsResponse());
  });

  it('should have null form group if activated route is admin/add', async()=>{
    TestBed.overrideProvider(ActivatedRoute, {useFactory: () =>{return new MockActivatedRoute('admin/add' ); } });
    await TestBed.compileComponents();
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    fixture.detectChanges();

    activatedRoute = TestBed.inject(ActivatedRoute);
    expect(component.newsFormGroup.controls.title.value).toBeFalsy();
    expect(component.newsFormGroup.controls.subject.value).toBeFalsy();
    expect(component.newsFormGroup.controls.snippet.value).toBeFalsy();
    expect(component.newsFormGroup.controls.content.value).toBeFalsy();
  })

});
