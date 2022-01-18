import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { MockActivatedRoute, MockNews } from 'src/environments/mock';
import { CommentService } from '../../../services/comment.service';

import { ReplyComponent } from './reply.component';

const TEST_TOOLTIP="Just singing in the rain, what a glorious feeling, I'm happy again"

describe('ReplyComponent', () => {
  let activatedRoute: ActivatedRoute;
  let commentService: CommentService;
  let component: ReplyComponent;
  let fixture: ComponentFixture<ReplyComponent>;
  let news : MockNews = new MockNews();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [ 
      ReplyComponent,
    ],
    imports: [ 
      HttpClientTestingModule,
      RouterTestingModule, 
      CommonModule,
      MaterialModule,
      NoopAnimationsModule,
      FormsModule,
      ReactiveFormsModule
    ],
    providers: [
      FormBuilder, 
      CommentService, 
      { provide: ActivatedRoute, useFactory: () => { return new MockActivatedRoute("news", 1); } }
    ]
  }).compileComponents();
  }));

  beforeEach(() => {
    activatedRoute = TestBed.inject(ActivatedRoute);
    commentService = TestBed.inject(CommentService);
    fixture = TestBed.createComponent(ReplyComponent);
    component = fixture.componentInstance;
    component.commentId = news.getNewsId();
    component.tooltip = TEST_TOOLTIP;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be constructed with parameter from activated route', ()=>{
    expect(component.postId).toEqual(activatedRoute.snapshot.params.id);
  })

  it('should display inputted tooltip over reply button', ()=>{
    const replyElement: DebugElement = fixture.debugElement.query(By.css('#reply-button'));
    const replyTooltip = replyElement.injector.get<MatTooltip>(MatTooltip);
    expect(replyTooltip.message).toEqual(TEST_TOOLTIP);
  })
});
