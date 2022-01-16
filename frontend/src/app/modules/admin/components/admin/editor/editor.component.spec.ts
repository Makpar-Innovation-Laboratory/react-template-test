import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { MaterialModule } from 'src/app/modules/shared/material.module';

import { EditorComponent } from './editor.component';

const mockActivatedRoute = {
  snapshot: { 
    url: [{ 
      path:{
        toString: () => { 
          return '/admin/add'; 
        }
      } 
    }]
  }
}

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

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
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
