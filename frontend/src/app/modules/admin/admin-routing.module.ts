import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { EditorComponent } from './components/admin/editor/editor.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '' , canActivate: [ AuthGuard ], component: AdminComponent }, 
  { path:'add', canActivate: [ AuthGuard ], component: EditorComponent },
  { path: 'user', canActivate: [ AuthGuard ], component: UserProfileComponent },
  { path: 'update/:id', canActivate: [ AuthGuard ], component: EditorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
