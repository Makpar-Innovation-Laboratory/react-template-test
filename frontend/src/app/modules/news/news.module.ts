import { NgModule } from '@angular/core';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './components/news/news.component';
import { FeedComponent } from './components/news/feed/feed.component';
import { StoryComponent } from './components/news/story/story.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SanitizePipe } from 'src/app/modules/shared/pipes/sanitize.pipe';
import { CommentsComponent } from './components/comments/comments.component';
import { ReplyComponent } from './components/comments/reply/reply.component';

/**
 * # NewsModule
 * ## Description
 * Module for importing the components and services necessary for interacting with the Innovation Lab backend api. Declares and exports {@link FeedComponent}, {@link NewsComponent}, {@link StoryComponent}, {@link CommentsComponent}, {@link ReplyComponent} and {@link SanitizePipe} for lazy-loading. Imports `NgxPagination`.
 */
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
