import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { EmployeeComponent } from './employee/employee.component';
import { DemoMaterialModule } from '../demo-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeTopCardComponent } from './employee/top-card/employee-card.component';
import { AddComponent } from './employee/add/add.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeDialogContent } from './employee/dialog-content/dialog-content.component';
import {
  UserprofileComponent,
  userProfileDialogContent,
} from './userprofile/userprofile.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';

@NgModule({
  declarations: [
    UsersComponent,
    EmployeeComponent,
    EmployeeTopCardComponent,
    AddComponent,
    EmployeeDialogContent,
    UserprofileComponent,
    userProfileDialogContent,
    AdminprofileComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
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
export class UsersModule {}
