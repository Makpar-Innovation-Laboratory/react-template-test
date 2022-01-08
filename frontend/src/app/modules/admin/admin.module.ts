import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { EditorComponent } from './components/admin/editor/editor.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SharedModule } from 'src/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';


@NgModule({
  declarations: [
    AdminComponent,
    EditorComponent,
    UserProfileComponent,
  ],
  imports: [
    AdminRoutingModule,
    AngularEditorModule,
    SharedModule,
  ],
  exports: [
    AdminComponent,
    EditorComponent,
    UserProfileComponent,
  ]
})
export class AdminModule { }
