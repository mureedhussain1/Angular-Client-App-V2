import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ClientprojectService } from 'src/app/services/clientproject.service';
import { helperService } from 'src/app/services/helper.service';
import { TaskmanagementService } from 'src/app/services/taskmanagement.service';

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

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent {
  isLinear = false;
  firstFormGroup: FormGroup = Object.create(null);
  secondFormGroup: FormGroup = Object.create(null);
  isOptional = false;
  isEditable = false;
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  team: any;
  assingedusers: any = [];
  allusers = false;
  questionaires: any;
  assingedqtns: any = [];
  allqtns = false;
  error = false;
  types = ['REG', 'INS', 'TRN', 'PUC'];
  gpslock = [1, 0];
  visittype = ['weekly', 'monthly', 'quartely', 'annually'];
  day = [
    'monday',
    'tuesday',
    'wednesday',
    'thrusday',
    'friday',
    'saturday',
    'sunday',
  ];
  userqtnerrror = '';
  profiles: any;
  assingedprofiles: any = [];
  allprofiles = false;
  relations = false;

  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = ['#', 'Agent', 'profiles'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  createoption = '';
  creationmode_user: any = '';
  assignederror = '';

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    private clientprojectmgt: ClientprojectService,
    private taskmgt: TaskmanagementService,
    private helperservice: helperService,
    private _formBuilder: FormBuilder,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;

    if (this.local_data.action != 'Delete') {
      this.getAllProjectQuestionairesNP();
      this.getProjectTeam();
      this.getAllProjectProfiles();
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  // do action method, performs fucntionality to add a task
  doAction(): void {
    this.error = false;
    this.userqtnerrror = '';
    if (
      this.local_data.title &&
      this.local_data.taskdescription &&
      this.local_data.type &&
      this.local_data.startdate &&
      this.local_data.duedate
    ) {
      this.local_data.assignedto = this.assingedusers;
      this.local_data.questionaires = this.assingedqtns;
      this.local_data.type = this.types[this.local_data.type - 1];
      this.local_data.visittype
        ? (this.local_data.visittype =
            this.visittype[this.local_data.visittype - 1])
        : '';
      this.local_data.day
        ? (this.local_data.day = this.day[this.local_data.day - 1])
        : '';
      this.local_data.gpslock
        ? (this.local_data.gpslock = this.gpslock[this.local_data.gpslock - 1])
        : '';

      if (this.assingedusers.length < 1 || this.assingedqtns.length < 1) {
        this.userqtnerrror = 'Assign atleast one from users and questionaires';
        throw new Error('');
      }

      if (this.local_data.type == 'REG') {
        this.taskmgt.saveNewTask(this.local_data).subscribe(
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
        this.taskmgt.saveNewInspTask(this.local_data).subscribe(
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
      }
    } else {
      this.error = true;
    }
  }

  // delete task method

  deleteTask() {
    this.taskmgt.deleteTask({ taskid: this.local_data.taskid }).subscribe(
      (action: any) => {
        action.status
          ? this.dialogRef.close({ event: this.action, data: this.local_data })
          : this.helperservice.dispalyError(action.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  //close dialogue method

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  //apply filter method

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // get project team method
  getProjectTeam() {
    this.clientprojectmgt
      .getProjectTeam({ projectid: this.local_data.projectid })
      .subscribe(
        (team: any) => {
          team.status
            ? (this.team = team.data)
            : this.helperservice.dispalyError(team.msg);
        },
        (error: any) => {
          this.helperservice.dispalyError(error.error);
        }
      );
  }
  //get project Questionaire mtd
  getAllProjectQuestionairesNP() {
    this.clientprojectmgt
      .getAllProjectQuestionairesNP({ projectid: this.local_data.projectid })
      .subscribe(
        (questions: any) => {
          questions.status
            ? (this.questionaires = questions.data)
            : this.helperservice.dispalyError(questions.msg);
        },
        (error: any) => {
          this.helperservice.dispalyError(error.error);
        }
      );
  }
  //get project profiles
  getAllProjectProfiles() {
    this.taskmgt
      .getAllProjectProfiles({ projectid: this.local_data.projectid })
      .subscribe(
        (profiles: any) => {
          profiles.status
            ? (this.profiles = profiles.data)
            : this.helperservice.dispalyError(profiles.msg);
        },
        (error: any) => {
          this.helperservice.dispalyError(error.error);
        }
      );
  }
  //show options method
  showOptions(event: any, user: any): void {
    if (event.checked) {
      this.assingedusers.push({ userid: user.userid, names: user.names });
    } else {
      this.assingedusers = this.assingedusers.filter(
        (item: any) => item.userid !== user.userid
      );
    }
  }
  // seletc users method
  selectAllUsers(event: any): void {
    if (event.checked) {
      this.assingedusers = this.team.map((user: any) => {
        return { userid: user.userid, names: user.names };
      });
      this.allusers = true;
    } else {
      this.assingedusers = [];
      this.allusers = false;
    }
  }
  // renders question options
  showQtnOptions(event: any, qtn: any): void {
    console.log(qtn);
    if (event.checked) {
      this.assingedqtns.push(qtn);
    } else {
      this.assingedqtns = this.assingedqtns.filter((item: any) => item !== qtn);
    }
  }
  // select all questions method
  selectAllQtns(event: any): void {
    if (event.checked) {
      this.assingedusers = this.team;
      this.allqtns = true;
    } else {
      this.assingedqtns = [];
      this.allqtns = false;
    }
  }

  // select all profiles method

  selectAllProfiles(event: any): void {
    if (event.checked) {
      this.assingedprofiles = this.profiles.map((ele: any) => {
        return ele;
      });
      this.allprofiles = true;
    } else {
      this.assingedprofiles = [];
      this.allprofiles = false;
    }
  }
  // add or remove profile
  showAddOrRemoveProfile(event: any, profile: any): void {
    if (event.checked) {
      this.assingedprofiles.push(profile);
    } else {
      const index = this.assingedprofiles.indexOf(profile);
      if (index > -1) {
        this.assingedprofiles.splice(index, 1);
      }
    }
  }

  //create mode function
  createMode(option: string) {
    this.assignederror = '';
    if (option == 'save') {
      if (this.creationmode_user && this.assingedprofiles.length > 0) {
        this.assingedusers.push({
          userid: this.creationmode_user.userid,
          names: this.creationmode_user.names,
          profiles: this.assingedprofiles,
        });
        this.dataSource = this.assingedusers;
        console.log(this.dataSource);
        this.createoption = '';
      } else {
        this.assignederror =
          'One agent and atleast one profile should be selected';
      }
    } else {
      this.createoption = option;
    }
  }
}
