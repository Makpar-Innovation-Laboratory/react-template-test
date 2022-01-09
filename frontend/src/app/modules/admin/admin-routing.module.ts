import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/modules/shared/guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { EditorComponent } from './components/admin/editor/editor.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  { path: '' , canActivate: [ AuthGuard ], component: AdminComponent }, 
  { path:'add', canActivate: [ AuthGuard ], component: EditorComponent },
  { path: 'user', canActivate: [ AuthGuard ], component: ProfileComponent },
  { path: 'update/:id', canActivate: [ AuthGuard ], component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
