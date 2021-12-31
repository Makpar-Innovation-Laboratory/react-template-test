import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';
import { sanitizeHtmlPipe } from './sanitize-html.pipe';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatTooltipModule } from '@angular/material/tooltip'; 
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; 
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdminComponent } from './components/admin/admin.component';
import { AddBlogComponent } from './components/admin/add-blog/add-blog.component';
import { AllBlogsComponent } from './components/admin/all-blogs/all-blogs.component';
import { UpdateBlogComponent } from './components/admin/update-blog/update-blog.component';
import { AlertDialogBodyComponent } from './components/alert-dialog-body/alert-dialog-body.component';
import { TagComponent } from './components/tag/tag.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AdminComponent,
    AddBlogComponent,
    AllBlogsComponent,
    UpdateBlogComponent,
    AlertDialogBodyComponent,
    TagComponent,
    ViewBlogComponent,
    sanitizeHtmlPipe,
    ToolbarComponent
  ],
  imports: [
    NgxWebstorageModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RichTextEditorAllModule,

    // MATERIAL IMPORTS
    MatSidenavModule,
    MatChipsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatTooltipModule,
    MatGridListModule,
    MatListModule,
    MatAutocompleteModule,
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
export class AppModule { }
