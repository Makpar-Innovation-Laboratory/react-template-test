import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ReplyComponent } from './reply.component';

describe('ReplyComponent', () => {
  let component: ReplyComponent;
  let fixture: ComponentFixture<ReplyComponent>;

  beforeAll(async () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    await TestBed.configureTestingModule({
      declarations: [ ReplyComponent ],
      providers: [
        FormBuilder, ActivatedRoute,
        { provide: HttpClient, useValue: httpClientSpy },

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
