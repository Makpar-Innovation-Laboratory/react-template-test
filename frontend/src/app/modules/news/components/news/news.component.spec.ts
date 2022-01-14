import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { NewsService } from '../../services/news.service';

import { NewsComponent } from './news.component';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsComponent ],
      imports: [ 
        RouterTestingModule.withRoutes([{path: 'news/feed', component: NewsComponent}]), 
        HttpClientTestingModule,
        MaterialModule 
      ],
      providers: [ NewsService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
