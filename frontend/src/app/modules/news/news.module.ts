import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './components/news/news.component';
import { CommentComponent } from './components/comment/comment.component';
import { CommentListComponent } from './components/comment-list/comment-list.component'; 
import { FeedComponent } from './components/news/feed/feed.component';
import { StoryComponent } from './components/news/story/story.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/shared/shared.module';
import { SanitizePipe } from 'src/shared/pipes/sanitize.pipe';

@NgModule({
  declarations: [
    CommentComponent,
    CommentListComponent,
    FeedComponent,
    NewsComponent,
    StoryComponent,
    SanitizePipe,
  ],
  imports: [
    SharedModule,
    NewsRoutingModule,
    NgxPaginationModule,
  ],
  exports: [
    CommentComponent,
    CommentListComponent,
    FeedComponent,
    NewsComponent,
    StoryComponent,
    SanitizePipe
  ]
})
export class NewsModule { }
