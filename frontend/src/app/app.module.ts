import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling'; 

import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatListModule } from '@angular/material/list'
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 

import { AppConfig, IconRegistry } from '../config';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { AppComponent } from './app.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { EditorComponent } from './components/admin/editor/editor.component';
import { FeedComponent } from './components/news/feed/feed.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component'; 
import { NewsComponent } from './components/news/news.component';
import { RegisterComponent } from './components/register/register.component';
import { StoryComponent } from './components/news/story/story.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TeamComponent } from './components/team/team.component';
import { MissionComponent } from './components/mission/mission.component';
import { ProjectComponent } from './components/projects/project/project.component';

/**
 * # AppModule
 * 
 * ## Description
 *  
 *  Controls module imports and dependency injection for the Angular application. An {@link AuthInterceptor} is injected into the HTTP middleware so that all outgoing requests have a JWT Bearer token appended to their authorization header.
 */
@NgModule({
  declarations: [
    // COMPONENTS
      // TODO: lazy-loaded admin module declarations
    AdminComponent,
    EditorComponent,
      // TODO: lazy-loaded news module declartions
    FeedComponent,
    NewsComponent,
    StoryComponent,
      // TODO: shared module
    DialogComponent,
    ToolbarComponent,
    SanitizePipe,

    // APP MODULE
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProjectsComponent,
    TeamComponent,
    MissionComponent,
    ProjectComponent,
  ],
  imports: [
    // ANGULAR CORE
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,

    // ANGULAR MATERIAL
      // TODO: turn these into a separate material module
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,
  

    // OTHER
      // ANGULAR EDITOR
        // TODO: lazy loaded admin module
    AngularEditorModule,
      // NGX WEBSTORAGE
        // TODO: shared module
    NgxWebstorageModule.forRoot(),

  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useFactory: function(session: SessionStorageService) {
        return new AuthInterceptor(session);
      },
      multi: true,
      deps: [SessionStorageService] 
    }
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
