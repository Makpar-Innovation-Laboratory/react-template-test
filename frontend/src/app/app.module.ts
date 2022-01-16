import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling'; 

import { NgxWebstorageModule } from 'ngx-webstorage';
import { MatIconRegistry } from '@angular/material/icon';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AppConfig, IconRegistry } from 'src/config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component'; 
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

/**
 * # AppModule
 * ## Description
 *  Controls module imports and dependency injection for the Angular application.
 * @module AppModule
 */
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
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
