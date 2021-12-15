import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxWebstorageModule, SessionStorageService } from 'ngx-webstorage';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule }  from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatProgressBarModule } from '@angular/material/progress-bar'; 

import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; 
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    NgxWebstorageModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    // MATERIAL IMPORTS
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
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
