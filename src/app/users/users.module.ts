import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { EmployeeComponent } from './employee/employee.component';
import { DemoMaterialModule } from '../demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeTopCardComponent } from './employee/top-card/employee-card.component';
import { AddComponent } from './employee/add/add.component';

@NgModule({
  declarations: [
    UsersComponent,
    EmployeeComponent,
    EmployeeTopCardComponent,
    AddComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  providers: [DatePipe],
})
export class UsersModule {}
