import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AllBlogsComponent } from './components/admin/all-blogs/all-blogs.component';
import { AddBlogComponent } from './components/admin/add-blog/add-blog.component';
import { UpdateBlogComponent } from './components/admin/update-blog/update-blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { AuthGuard } from './guards/auth.guard';
import { MissionComponent } from './components/mission/mission.component';
import { TeamComponent } from './components/team/team.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', canActivate: [ AuthGuard ], component: HomeComponent},
  { path:'admin', canActivate: [ AuthGuard ], component:AdminComponent,
    children:[
      {path:'all-blogs', component:AllBlogsComponent},
      {path:'add-blog', component:AddBlogComponent},
      {path:'update-blog/:id',component:UpdateBlogComponent}
    ]
  },
  {path:'blog/:id', canActivate: [AuthGuard], component:ViewBlogComponent},
  { path: 'mission', canActivate: [AuthGuard], component: MissionComponent},
  { path: 'team', canActivate: [AuthGuard], component: TeamComponent},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
