import { AuthenticationComponent } from './authentication/authentication.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: AuthenticationComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./projects/projects.module').then((m) => m.ProjectsModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'tasks',
        loadChildren: () =>
          import('./tasks/tasks.module').then((m) => m.TasksModule),
      },
    ]
  },
    // redirect to home
    { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
