import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from 'src/app/modules/core/components/projects/projects.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { TeamComponent } from './components/team/team.component';
import { MissionComponent } from './components/mission/mission.component';

const routes: Routes = [
  { path: 'mission', canActivate: [ AuthGuard ],  component: MissionComponent },
  { path: 'projects', canActivate: [ AuthGuard ], component: ProjectsComponent },
  { path: 'team', canActivate: [ AuthGuard ], component: TeamComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
