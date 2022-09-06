import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientprojectService } from 'src/app/services/clientproject.service';
import { helperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

export interface TicketElement {
  id: number;
  creator: string;
  title: string;
  assignee: string;
  status: string;
  labelbg: string;
  product: string;
  date: string;
}

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class AddTeamMemberComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  additionerror = false;
  users: any;
  systemroles: any;
  projectid: any;
  dataSource: any;
  npk: any;
  pickedusers: any = [];

  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<AddTeamMemberComponent>,
    public route: ActivatedRoute,
    private userService: UserService,
    private helperservice: helperService,
    private clientproject: ClientprojectService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: TicketElement
  ) {
    this.npk = this.router.routerState.snapshot.url;

    localStorage.setItem('b2b', this.npk);

    debugger;
    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.getAllUsers();
    this.getSystemRoles();
  }
  // adding a team member
  doAction(): void {
    if (this.action == 'Add') {
      this.projectid = localStorage.getItem('projectid');
      this.local_data.projectid = this.projectid;
      if (this.local_data.userid && this.local_data.role) {
        this.clientproject.addMember(this.local_data).subscribe(
          (action: any) => {
            this.fetchTeamMembers();
            action.status
              ? this.dialogRef.close({
                  event: this.action,
                  data: this.local_data,
                })
              : '';
          },
          (error: any) => {
            this.helperservice.dispalyError(error.msg);
          }
        );
      } else {
        this.additionerror = true;
      }
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
  //fetching team members

  fetchTeamMembers() {
    this.clientproject.getTeamMembers(this.projectid).subscribe(
      (members: any) => {
        members.status
          ? (this.dataSource = members.data.docs)
          : this.helperservice.dispalyError(members.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  // selects user
  selectUser(event: any, user: any): void {
    if (event.checked) {
      this.pickedusers.push({ userid: user.userid, names: user.firstname });
    }
  }
  //closes dialogue
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  //get all users method
  public getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: any) => {
        users.status
          ? (this.users = users.data.rows.filter((e: any) => {
              return e.firstname != '' && e.lastname != '';
            }))
          : console.log('alert');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  // fetch system roles
  getSystemRoles() {
    this.userService.getSystemRoles().subscribe(
      (roles: any) => {
        roles.status ? (this.systemroles = roles.data) : '';
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
}
