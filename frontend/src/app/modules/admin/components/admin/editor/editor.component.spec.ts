import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { MockActivatedRoute, MockNews } from 'src/environments/mock';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let httpTestingController: HttpTestingController;
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let activatedRoute: ActivatedRoute;
  let news : MockNews = new MockNews();

  beforeAll(()=>{
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
    }).compileComponents();
  });

  beforeEach(() => {
    activatedRoute = TestBed.inject(ActivatedRoute);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created and initialize with data from backend API using activated route param', () => {
    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne(`/api/news/post/${activatedRoute.snapshot.params.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(news.getNewsResponse());
    expect(component.newsFormGroup.controls.title.value).toEqual(news.mockNews.title);
    expect(component.newsFormGroup.controls.subject.value).toEqual(news.mockNews.subject);
    expect(component.newsFormGroup.controls.snippet.value).toEqual(news.mockNews.snippet);
    expect(component.newsFormGroup.controls.content.value).toEqual(news.mockNews.content);
  });
});
