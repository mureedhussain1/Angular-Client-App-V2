import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { AddTeamMemberComponent } from './projectdetail/dialog-content/dialog-content.component';
import { AddProjectComponent } from './add-project/addproject.component';
import { ProjectTopCardComponent } from './projects-top-card/project-card.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectDetailComponent } from './projectdetail/project-detail.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    DialogContentComponent,
    AddTeamMemberComponent,
    AddProjectComponent,
    ProjectTopCardComponent,
    ProjectDetailComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,

    TranslateModule.forRoot(),
  ],
  providers: [
    DatePipe,
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class ProjectsModule {}
