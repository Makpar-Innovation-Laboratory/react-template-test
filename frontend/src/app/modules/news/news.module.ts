import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './components/news/news.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component'; 
import { FeedComponent } from './components/news/feed/feed.component';
import { StoryComponent } from './components/news/story/story.component';

@NgModule({
  declarations: [
    CommentComponent,
    CommentListComponent,
    FeedComponent,
    NewsComponent,
    StoryComponent
  ],
  imports: [
    CommonModule,
    NewsRoutingModule
  ],
  exports: [
    CommentComponent,
    CommentListComponent,
    FeedComponent,
    NewsComponent,
    StoryComponent
  ]
})
export class NewsModule { }
