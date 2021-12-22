import {
  Component,
  OnInit,
  Inject,
  Optional,
  ViewChild,
  AfterViewInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ClientService } from 'src/app/services/client.service';
import { helperService } from 'src/app/services/helper.service';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { EmployeeDialogContent } from './dialog-content/dialog-content.component';
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
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'name',
    'email',
    'mobile',
    'status',
    'verified',
    'addedby',
    'date of joining',
    'Last Accessed',
    'action',
  ];
  dataSource: any;
  @Output()
  change = new EventEmitter<MatRadioChange>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  public id!: number;
  public user!: User;
  public users!: User[];

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    public dialogRef: MatDialogRef<EmployeeDialogContent>,
    private userService: UserService,
    private helperservice: helperService,
    private router: Router
  ) {
    this.getAllUsers();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  // manual filter on mat tables

  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }

  // function to open dialogue

  openDialog(action: string, obj: any): void {
    obj.action = action;

    const dialogRef = this.dialog.open(EmployeeDialogContent, {
      data: obj,
    });
    // funtion to close mat dialoge
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.addRowData();
      } else if (result.event === 'Filter') {
        this.searchData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteData(result.data);
      }
    });
  }

  // tslint:disable-next-line - Disables all
  addRowData() {
    this.getAllUsers();
  }

  // search data functionality
  searchData(row_obj: any) {
    delete row_obj['imagePath'];
    delete row_obj['action'];
    this.userService.searchUsers(row_obj).subscribe(
      (users: any) => {
        users.status
          ? this.setDataTable(users.data.rows)
          : this.helperservice.dispalyError(users.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  //function to delete data from data tables and db
  deleteData(row_obj: any) {
    this.userService.deleteAUsers(row_obj.id).subscribe(
      (action: any) => {
        action.status
          ? this.deleteRowData(row_obj)
          : this.helperservice.dispalyError(action.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  // method that refreshes table data after delete action is performed
  deleteRowData(row_obj: any) {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.id !== row_obj.id;
    });
  }

  public getUser() {}

  //  function that fetched all users

  public getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (users: any) => {
        users.status
          ? this.setDataTable(users.data.rows)
          : console.log('alert');
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  //function to set data in mat data tables

  private setDataTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  // function that calls user profile data
  public userProfile(user: any) {
    this.router.navigate(['/App/Userprofile'], {
      queryParams: {
        profile: JSON.stringify(user),
      },
    });
  }
}
