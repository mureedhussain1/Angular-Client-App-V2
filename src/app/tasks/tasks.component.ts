import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { TaskmanagementService } from 'src/app/services/taskmanagement.service';
import { helperService } from 'src/app/services/helper.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

const DUMMY_DATA = [
  {
    _id: 'kvwn3xp5q1pwqjrupzbINS',
    taskid: '618ea0f2267d380013baf092',
    title: 'Test Inspection',
    taskdescription: 'We testing',
    duedate: '2021-11-27',
    addedBy: {
      _id: '618ea0f2267d380013baf094',
      userid: 178,
      name: 'Mowzey User',
    },
    startdate: '2021-11-12',
    createdAt: '2021-11-12T17:14:26.782Z',
    type: 'INS',
    count: 1,
  },
  {
    _id: 'kvtod3rkm70njfjbtajINS',
    taskid: '618be497267d380013baf045',
    title: 'egestas neque 2',
    taskdescription: 'We testing',
    duedate: '2021-11-18',
    addedBy: {
      _id: '618be497267d380013baf047',
      userid: 178,
      name: 'Mowzey User',
    },
    startdate: '2021-11-10',
    createdAt: '2021-11-10T15:26:15.644Z',
    type: 'INS',
    count: 4,
  },
  {
    _id: 'kvtkqez1fsneo5mtq6INS',
    taskid: '618bccc6267d380013baeffc',
    title: 'egestas neque',
    taskdescription: 'We testing',
    duedate: '2021-11-13',
    addedBy: {
      _id: '618bccc6267d380013baeffe',
      userid: 178,
      name: 'Mowzey User',
    },
    startdate: '2021-11-11',
    createdAt: '2021-11-10T13:44:38.247Z',
    type: 'INS',
    count: 4,
  },
  {
    _id: 'kvllutt5x0rh9zjqyjREG',
    taskid: '6184729239223b0013a2356b',
    title: 'farmerRegistrations',
    taskdescription: 'Traceability and farmer management',
    duedate: '2021-12-04',
    addedBy: {
      _id: '6184729239223b0013a2356d',
      userid: 184,
      name: 'Colline Kisubi',
    },
    startdate: '2021-11-05',
    createdAt: '2021-11-04T23:53:54.288Z',
    type: 'REG',
    count: 1,
  },
  {
    _id: 'kvgufx004f592hrryp9REG',
    taskid: '61800dec059f960013ad7b93',
    title: 'TesT 1',
    taskdescription: 'We testing',
    duedate: '2021-11-12',
    addedBy: {
      _id: '61800dec059f960013ad7b95',
      userid: 178,
      name: 'Mowzey User',
    },
    startdate: '2021-11-04',
    createdAt: '2021-11-01T15:55:24.265Z',
    type: 'REG',
    count: 2,
  },
  {
    _id: 'kve2vdmdy35j1tx34eINS',
    taskid: '617d80a4ea4e9e0012cdccdd',
    title: 'This is a task',
    taskdescription: 'Task description',
    duedate: '24/08/2021',
    addedBy: {
      _id: '617d80a4ea4e9e0012cdccdf',
      userid: 178,
      name: 'Mowzey User',
    },
    startdate: '24/08/2021',
    createdAt: '2021-10-30T17:28:04.043Z',
    type: 'INS',
    count: 2,
  },
  {
    _id: 'kvdl9rcqkg91b670ojpINS',
    taskid: '617d0d29c7cfa168050c2585',
    title: 'This is a task',
    taskdescription: 'Task description',
    duedate: '24/08/2021',
    addedBy: {
      _id: '617d0d29c7cfa168050c2587',
      userid: 178,
      name: 'Mowzey User',
    },
    startdate: '24/08/2021',
    createdAt: '2021-10-30T09:15:21.944Z',
    type: 'INS',
    count: 2,
  },
  {
    _id: 'kvdh0qmukj23im1bjtINS',
    taskid: '617cf1468901c32721171de0',
    title: 'This is a task',
    taskdescription: 'Task description',
    duedate: '24/08/2021',
    addedBy: {
      _id: '617cf1468901c32721171de2',
      userid: 178,
      name: 'Mowzey User',
    },
    startdate: '24/08/2021',
    createdAt: '2021-10-30T07:16:22.647Z',
    type: 'INS',
    count: 2,
  },
  {
    _id: 'uniueString',
    taskid: '617cee0cd87afa1ec92e13c7',
    title: 'This is a task',
    taskdescription: 'Task description',
    duedate: '24/08/2021',
    addedBy: {
      _id: '617cee0cd87afa1ec92e13c9',
      userid: 178,
      name: 'Mowzey User',
    },
    startdate: '24/08/2021',
    createdAt: '2021-10-30T07:02:36.886Z',
    type: null,
    count: 4,
  },
  {
    _id: '1234',
    taskid: '61672725563a181de0043bee',
    title: 'task title',
    taskdescription: 'New task',
    duedate: '22/12/2021',
    addedBy: {
      _id: '61672725563a181de0043bf0',
      userid: 11,
      name: 'Edited User User Re-edited',
    },
    startdate: '30/12/2021',
    createdAt: '2021-10-13T18:36:21.163Z',
    type: 'REG',
    count: 2,
  },
];
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
  // dataSource = new MatTableDataSource([]);
  dataSource = new MatTableDataSource(DUMMY_DATA);
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
          ? // ? (this.dataSource = tasks.data.docs)
            (this.dataSource = new MatTableDataSource(DUMMY_DATA))
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
