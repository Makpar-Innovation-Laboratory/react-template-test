import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { CommentService } from '../../../services/comment.service';

import { ReplyComponent } from './reply.component';

describe('ReplyComponent', () => {
  let component: ReplyComponent;
  let fixture: ComponentFixture<ReplyComponent>;

  beforeAll(async () => {
    const mockActivateRoute = {
      snapshot: { 
        url: { toString: () => { return 'news/1'; } },
        params: { id: 1 }
      } 
    }
    await TestBed.configureTestingModule({
    declarations: [ ReplyComponent ],
    imports: [ HttpClientTestingModule,
               RouterTestingModule, 
               MaterialModule ],
    providers: [
      FormBuilder, CommentService, 
      { provide: ActivatedRoute, useValue: mockActivateRoute }
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
