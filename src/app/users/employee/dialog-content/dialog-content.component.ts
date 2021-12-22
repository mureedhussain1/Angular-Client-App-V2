import { DatePipe } from '@angular/common';
import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Optional,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { helperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';

export interface Employee {
  id: number;
  Name: string;
  Position: string;
  Email: string;
  Mobile: number;
  DateOfJoining: Date;
  Salary: number;
  Projects: number;
  imagePath: string;
}
// second to manage data in dialogue
@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})

// tslint:disable-next-line: component-class-suffix
export class EmployeeDialogContent {
  form: Employee = {
    id: 0,
    Name: '',
    Position: '',
    Email: '',
    Mobile: 0,
    DateOfJoining: new Date(),
    Salary: 0,
    Projects: 0,
    imagePath: '',
  };
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  systemroles: any = '';
  filteredroles: any = '';
  clients: any = '';
  npk: any;
  users: any;
  public additionerror = false;
  @Output()
  change!: EventEmitter<MatRadioChange>;
  invitationerror = false;
  show = false;

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<EmployeeDialogContent>,
    private userservice: UserService,
    private clientservice: ClientService,
    private helperservice: helperService,
    public router: Router,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd'
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/users/placeholder.png';
    }
    this.getSystemRoles();
    this.getSystemClients();
    this.getAllUsers();
    this.npk = this.router.routerState.snapshot.url;
    localStorage.setItem('b2b', this.npk);
  }

  //    function to fetch all users

  getAllUsers() {
    this.userservice.getAllUsers().subscribe(
      (users: any) => {
        users.status ? (this.users = users.data.rows) : console.log('alert');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // function to fetch all system roles
  getSystemRoles() {
    this.userservice.getSystemRoles().subscribe(
      (roles: any) => {
        console.log(roles);
        roles.status ? (this.systemroles = roles.data) : '';
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  // function to fetch all system clients

  getSystemClients() {
    this.clientservice.getAllClients().subscribe(
      (clients: any) => {
        clients.status ? (this.clients = clients.data) : '';
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  // function to check whether user is standard

  CheckUser(data: any) {
    const x = data.value.replace(/\s/g, '').toLowerCase();
    console.log(x);
    if (x === 'standarduser') {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  // do function to listen to add user action
  doAction(): void {
    this.additionerror = false;
    if (this.action == 'Add') {
      console.log(this.local_data);
      if (
        this.local_data.firstname &&
        this.local_data.lastname &&
        this.local_data.phone &&
        this.local_data.email &&
        this.local_data.role
      ) {
        this.userservice.addUser(this.local_data).subscribe(
          (action: any) => {
            action.status
              ? this.dialogRef.close({
                  event: this.action,
                  data: this.local_data,
                })
              : '';
          },
          (error: any) => {
            this.helperservice.dispalyError(error.error);
          }
        );
      } else {
        this.additionerror = true;
      }
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }
  }
  //function to add uzer by invitation
  inviteUser(): void {
    this.invitationerror = false;
    if (this.local_data.email && this.local_data.role) {
      // console.log(this.local_data.role)
      this.userservice.inviteUser(this.local_data).subscribe(
        (action: any) => {
          action.status
            ? this.successfulClose()
            : this.helperservice.dispalyError(action.msg || action);
        },
        (error: any) => {
          this.helperservice.dispalyError(error.error);
        }
      );
    } else {
      this.invitationerror = true;
    }
  }

  //    function that renders success activity

  successfulClose() {
    this.helperservice.dispalyError('Success');
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }
  // function that manages closing dialogue

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }

  // function that manages select file

  selectFile(event: any): void {
    if (!event.target.files[0] || event.target.files[0].length === 0) {
      // this.msg = 'You must select an image';
      return;
    }
    const mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      // this.msg = "Only images are supported";
      return;
    }
    // tslint:disable-next-line - Disables all
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line - Disables all
    reader.onload = (_event) => {
      // tslint:disable-next-line - Disables all
      this.local_data.imagePath = reader.result;
    };
  }
  // function to filter roles
  onClientChange(event: any) {
    if (event.value == undefined) {
      this.filteredroles = this.systemroles.filter(
        (roles: any) => roles.id < 3
      );
    } else {
      this.filteredroles = this.systemroles.filter(
        (roles: any) => roles.id >= 3
      );
    }
  }
}
