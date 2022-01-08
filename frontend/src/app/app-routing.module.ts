import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../shared/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { RegisterComponent } from './components/register/register.component';
import { TeamComponent } from './components/team/team.component';
import { MissionComponent } from './components/mission/mission.component';

const routes: Routes = [
  { path: '', canActivate: [ AuthGuard ], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mission', canActivate: [ AuthGuard ],  component: MissionComponent },
  { path: 'projects', canActivate: [ AuthGuard ], component: ProjectsComponent },
  { path: 'team', canActivate: [ AuthGuard ], component: TeamComponent },  
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'news', loadChildren: () => import('./modules/news/news.module').then(m => m.NewsModule) },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
