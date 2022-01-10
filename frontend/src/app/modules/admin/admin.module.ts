import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { EditorComponent } from './components/admin/editor/editor.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NewsService } from '../news/services/news.service';

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
