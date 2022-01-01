import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component'
import { ArchiveComponent } from './components/admin/archive/archive.component';
import { StoryComponent } from './components/story/story.component';
import { EditorComponent } from './components/admin/editor/editor.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'news/:id' , canActivate: [ AuthGuard], component: StoryComponent },
  { path: 'admin' , canActivate: [ AuthGuard ], component: AdminComponent,
    // TODO: turn these into a lazy-loaded module
    children:[
      { path:'archive', component: ArchiveComponent },
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
