import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NewsService } from 'src/app/modules/news/services/news.service';
import { MaterialModule } from 'src/app/modules/shared/material.module';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeAll(()=>{
    const mockActivatedRoute = {
      snapshot: { url: { toString: () => { return '/admin/add'; } } }
    }
    TestBed.configureTestingModule({
      declarations: [ EditorComponent ], 
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule,
        OverlayModule, 
        MaterialModule],
      providers:[
        NewsService, FormBuilder, DomSanitizer,
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
