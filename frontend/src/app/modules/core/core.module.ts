import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { MissionComponent } from './components/mission/mission.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { TeamComponent } from './components/team/team.component';

/**
 * # CoreModule
 * ## Description
 * Module for the core Innovation Lab site components. Declares and exports {@link MissionComponent}, {@link ProjectsComponent}, {@link ProjectComponent} and {@link TeamComponent} for all other modules that need access to these components.
 * @module CoreModule
 */
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
  ],
  exports: [
    MissionComponent,
    ProjectsComponent,
    ProjectComponent,
    TeamComponent
  ]
})
export class CoreModule { }
