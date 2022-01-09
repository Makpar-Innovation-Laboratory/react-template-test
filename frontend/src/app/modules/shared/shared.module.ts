import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SessionStorageService } from 'ngx-webstorage';
import { MaterialModule } from 'src/app/modules/shared/material.module';
import { AuthInterceptor } from 'src/app/modules/shared/interceptors/auth.interceptor';

import { DialogComponent } from './components/dialog/dialog.component';

/**
 * # SharedModule
 * ## Description
 * Modules for imports shared across all other modules. Imports and exports {@link MaterialModule} for other modules. Injects a {@link AuthInterceptor} into the HTTP request chain to append JWT {@link Token} stored in the browser's session.
 */
@NgModule({
  declarations: [
    DialogComponent,
  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule   
  ],
  exports: [
    DialogComponent,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
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
  ]
})
export class SharedModule { }
