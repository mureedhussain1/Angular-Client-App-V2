import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TaskmanagementService } from 'src/app/services/taskmanagement.service';
import { helperService } from 'src/app/services/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

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
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    '#',
    'title',
    'type',
    'status',
    'startdate',
    'duedate',
    'createdby',
    'date_added',
    'action',
  ];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);
  projectid: any = '';

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private route: ActivatedRoute,
    private taskmgt: TaskmanagementService,
    private helperservice: helperService,
    private router: Router
  ) {
    this.projectid = this.route.snapshot.paramMap.get('projectid');
    this.getAllTask({ projectid: this.projectid });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  // returns module type function
  returnType(type: string): string {
    const types: any = {
      REG: 'Registration',
      INS: 'Inspection',
      TRN: 'Training',
    };
    return types[type];
  }
  //get all tasks function
  getAllTask(where: any) {
    this.taskmgt.getAllTasks(where).subscribe(
      (tasks: any) => {
        tasks.status
          ? (this.dataSource = tasks.data.docs)
          : this.helperservice.dispalyError(tasks.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  //applys filter to tasks
  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }
  // open dialogue on task mgt
  openDialog(action: string, obj: any): void {
    obj.action = action;
    obj.projectid = this.projectid;
    console.log(obj);
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.getAllTask({ projectid: this.projectid });
      } else if (result.event === 'Update') {
      } else if (result.event === 'Delete') {
      }
    });
  }
  //function to render task profile
  taskProfile(task: any) {
    // console.log(task)
    if (task.type === 'REG') {
      this.router.navigate(['/App/regmapview/' + task._id], {
        queryParams: {},
      });
    } else {
      this.router.navigate(['/App/TaskProfile/' + task._id], {
        queryParams: {},
      });
    }
  }
}
