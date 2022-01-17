import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { CommentService } from '../../../services/comment.service';

import { ReplyComponent } from './reply.component';

const mockActivatedRoute = {
  snapshot: { 
    url: { toString: () => { return 'news/1'; } },
    params: { id: 1 }
  } 
}

const TEST_ID=1;
const TEST_TOOLTIP="Just singing in the rain, what a glorious feeling, I'm happy again"

describe('ReplyComponent', () => {
  let component: ReplyComponent;
  let fixture: ComponentFixture<ReplyComponent>;

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
      FormBuilder, CommentService, 
      { provide: ActivatedRoute, useValue: mockActivatedRoute }
    ]
  }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyComponent);
    component = fixture.componentInstance;
    component.commentId = TEST_ID;
    component.tooltip = TEST_TOOLTIP;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should be constructed with parameter from activated route', ()=>{
    expect(component.postId).toEqual(mockActivatedRoute.snapshot.params.id);
  })

  it('should display inputted tooltip over reply button', ()=>{
    const replyElement: DebugElement = fixture.debugElement.query(By.css('#reply-button'));
    const replyTooltip = replyElement.injector.get<MatTooltip>(MatTooltip);
    expect(replyTooltip.message).toEqual(TEST_TOOLTIP);
  })
});
