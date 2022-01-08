import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling'; 

import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { MatIconRegistry } from '@angular/material/icon';

import { SharedModule } from '../shared/shared.module';
import { AppConfig, IconRegistry } from '../config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component'; 
import { RegisterComponent } from './components/register/register.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';
import { MissionComponent } from './components/mission/mission.component';
import { ProjectComponent } from './components/projects/project/project.component';
import { PaginationComponent } from './modules/news/components/news/feed/pagination/pagination.component';

/**
 * # AppModule
 * 
 * ## Description
 *  
 *  Controls module imports and dependency injection for the Angular application. An {@link AuthInterceptor} is injected into the HTTP middleware so that all outgoing requests have a JWT Bearer token appended to their authorization header.
 */
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProjectsComponent,
    TeamComponent,
    MissionComponent,
    ProjectComponent,
    PaginationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    NgxWebstorageModule.forRoot(),
    SharedModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(private matIconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer){
    AppConfig.registry.forEach((iconData: IconRegistry)=>{
      this.matIconRegistry.addSvgIcon(iconData.icon, this.sanitizer.bypassSecurityTrustResourceUrl(iconData.location))
    })
  }
}
