import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MissionComponent } from './components/mission/mission.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { TeamComponent } from './components/team/team.component';

@NgModule({
  declarations: [
    MissionComponent,
    ProjectsComponent,
    ProjectComponent,
    TeamComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule
  ]
})
export class CoreModule { }
