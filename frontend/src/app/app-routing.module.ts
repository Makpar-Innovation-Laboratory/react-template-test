import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component'
import { EditorComponent } from './components/admin/editor/editor.component';
import { FeedComponent } from './components/news/feed/feed.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewsComponent } from './components/news/news.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RegisterComponent } from './components/register/register.component';
import { StoryComponent } from './components/news/story/story.component';
import { TeamComponent } from './components/team/team.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'team', component: TeamComponent },
    // TODO: turn these routes into a lazy-loaded news module
  { path: 'news', canActivate: [ AuthGuard ], component: NewsComponent,
    children: [
      { path: 'feed', component: FeedComponent },
      { path: ':id', component: StoryComponent }
    ]
  },
    // TODO: turn these routes into a lazy-loaded admin module
  { path: 'admin' , canActivate: [ AuthGuard ], component: AdminComponent,
    children:[
      { path:'add', component: EditorComponent },
      { path: 'feed', component: FeedComponent },
      { path: 'user', component: UserProfileComponent },
      { path:'update/:id', component: EditorComponent }
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
