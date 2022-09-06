import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { TasksComponent } from './tasks.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from './add/addtask.component';

@NgModule({
  declarations: [TasksComponent, AddTaskComponent, DialogContentComponent],
  imports: [
    CommonModule,
    TasksRoutingModule,
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
export class TasksModule {}
