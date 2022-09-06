import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { helperService } from 'src/app/services/helper.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {
  private mediaMatcher: MediaQueryList = matchMedia(`(max-width: 960px)`);

  public config: PerfectScrollbarConfigInterface = {};

  displayMode = 'default';
  tabindex = 1;

  messageOpen = false;
  sidePanelOpened = true;
  userprofile: any;
  clients: any;
  systemroles: any;
  selectedrole: any = '';
  selectedclientid: any = '';
  selectedstatus: any = '';
  disablecomment: any;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private clientservice: ClientService,
    private helperservice: helperService,
    private userservice: UserService
  ) {
    this.getSystemClients();
    this.getSystemRoles();
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.userprofile = JSON.parse(params['profile']);
      this.getSystemRoles();
      this.getSystemClients();
      console.log(this.userprofile, 'PASSED DATA');
    });
  }

  getSystemRoles() {
    this.userservice.getSystemRoles().subscribe(
      (roles: any) => {
        roles.status ? (this.systemroles = roles.data) : '';
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  getSystemClients() {
    this.clientservice.getAllClients().subscribe(
      (clients: any) => {
        clients.status
          ? (this.clients = clients.data)
          : this.helperservice.dispalyError(clients.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  isOver(): boolean {
    return this.mediaMatcher.matches;
  }

  onChangeTab(tabindex: any): void {
    this.tabindex = tabindex;
  }

  submitFrom() {
    this.selectedrole != ''
      ? (this.userprofile.role = this.selectedrole)
      : (this.userprofile.role = this.userprofile.administratorrole.id);

    this.selectedclientid != ''
      ? (this.userprofile.clientid = this.selectedclientid)
      : (this.userprofile.clientid =
          this.userprofile.client != null
            ? this.userprofile.client.id
            : undefined);

    this.userprofile.userid = this.userprofile.id;

    this.userservice.updateUserProfile(this.userprofile).subscribe(
      (edit: any) => {
        this.helperservice.dispalyError(edit.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  showCommentDialog() {
    const dialogRef = this.dialog.open(userProfileDialogContent, {
      data: { userid: this.userprofile.id, commet: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.disablecomment = result.comment;
      this.deactivate();
    });
  }

  deactivate() {
    if (this.disablecomment && this.disablecomment != '') {
      this.userservice
        .disableUser({
          userid: this.userprofile.id,
          comment: this.disablecomment,
        })
        .subscribe(
          (action: any) => {
            action.status ? (this.userprofile.isActive = false) : '';
            this.helperservice.dispalyError(action.msg);
          },
          (error: any) => {
            this.helperservice.dispalyError(error.error);
          }
        );
    } else {
      this.helperservice.dispalyError('Provide a comment');
    }
  }

  activate() {
    this.userservice.enableUser(this.userprofile.id).subscribe(
      (action: any) => {
        action.status ? (this.userprofile.isActive = true) : '';
        this.helperservice.dispalyError(action.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
// tslint:disable-next-line: component-class-suffix
export class userProfileDialogContent {
  comment = '';
  private error = false;

  constructor(
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<userProfileDialogContent>,
    private userservice: UserService,
    private helperservice: helperService
  ) // @Optional() is used to prevent error if no data is passed
  {}

  doAction(): void {
    this.error = false;
    this.dialogRef.close({ comment: this.comment });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
