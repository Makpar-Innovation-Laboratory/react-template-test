import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { EditorComponent } from './components/admin/editor/editor.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsService } from '../news/services/news.service';


/**
 * # AdminModule
 * ## Description
 * Module for the admin Innovation Lab site components. Declares and exports {@link AdminComponent}, {@link EditorComponent}, {@link ProfileComponent} for all other modules that need access to these components. Injects the module level service {@link NewsService} into these components.
 * @module AdminModule
 */
@NgModule({
  declarations: [
    AdminComponent,
    EditorComponent,
    ProfileComponent,
  ],
  imports: [
    AdminRoutingModule,
    AngularEditorModule,
    SharedModule,
  ],
  exports: [
    AdminComponent,
    EditorComponent,
    ProfileComponent,
  ],
  providers:[
    NewsService
  ]
})
export class AdminModule { }
