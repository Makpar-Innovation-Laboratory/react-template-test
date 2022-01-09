import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './components/news/news.component';
import { FeedComponent } from './components/news/feed/feed.component';
import { StoryComponent } from './components/news/story/story.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/shared/shared.module';
import { SanitizePipe } from 'src/shared/pipes/sanitize.pipe';
import { CommentsComponent } from './components/comments/comments.component';
import { ReplyComponent } from './components/comments/reply/reply.component';

@NgModule({
  declarations: [
    FeedComponent,
    NewsComponent,
    StoryComponent,
    SanitizePipe,
    CommentsComponent,
    ReplyComponent,
  ],
  imports: [
    SharedModule,
    NewsRoutingModule,
    NgxPaginationModule,
  ],
  exports: [
    ReplyComponent,
    CommentsComponent,
    FeedComponent,
    NewsComponent,
    StoryComponent,
    SanitizePipe
  ]
})
export class NewsModule { }
