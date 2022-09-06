import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { EmployeeComponent } from './employee/employee.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    data: {
      name: 'Users',
      urls: [{ title: 'Dashboard' }, { title: 'Users' }],
    },
  },
  {
    path: 'Userprofile',
    component: UserprofileComponent,
    data: {
      name: 'User Profile',
      urls: [{ title: 'User Profile', url: '/users/Userprofile' }],
    },
  },
  {
    path: 'adminprofile',
    component: AdminprofileComponent,
    data: {
      name: 'My Profile',
      urls: [
        { title: 'My Profile', url: 'users/adminprofile' },
        { title: 'My Profile' },
      ],
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
