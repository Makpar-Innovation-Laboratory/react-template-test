import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component'
import { FeedComponent } from './components/feed/feed.component';
import { RegisterComponent } from './components/register/register.component';
import { StoryComponent } from './components/story/story.component';
import { EditorComponent } from './components/admin/editor/editor.component';

const routes: Routes = [
  { path: '', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'feed', canActivate: [ AuthGuard ], component: FeedComponent },
  { path: 'news/:id' , canActivate: [ AuthGuard], component: StoryComponent },
  // TODO: turn these into a lazy-loaded module
  { path: 'admin' , canActivate: [ AuthGuard ], component: AdminComponent,
    children:[
      { path:'add', component: EditorComponent },
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
