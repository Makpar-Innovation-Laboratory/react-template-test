import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/shared/guards/auth.guard';
import { FeedComponent } from './components/news/feed/feed.component';
import { NewsComponent } from './components/news/news.component';
import { StoryComponent } from './components/news/story/story.component';

const routes: Routes = [
  { path: '', canActivate: [ AuthGuard ], component: NewsComponent },
  { path: 'feed', canActivate: [ AuthGuard ], component: FeedComponent },
  { path: ':id', canActivate: [ AuthGuard ], component: StoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
