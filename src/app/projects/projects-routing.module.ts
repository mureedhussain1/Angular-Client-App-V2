import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDetailComponent } from './projectdetail/project-detail.component';
import { ProjectsComponent } from './projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {
      name: 'Projects',
      urls: [{ title: 'Dashboard' }, { title: 'Projects' }],
    },
  },

  {
    path: 'Projectdetail/:id',
    component: ProjectDetailComponent,
    data: {
      // title: 'Project Profile',
      urls: [
        { title: 'Project', url: '/projects/project-detail' },
        { title: 'Project' },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
