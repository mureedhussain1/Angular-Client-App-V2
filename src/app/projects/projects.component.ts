import {
  Component,
  OnInit,
  Inject,
  Optional,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AddProjectComponent } from './add-project/addproject.component';
import { ClientprojectService } from 'src/app/services/clientproject.service';
import { helperService } from 'src/app/services/helper.service';
import { RocksideProjectMgtService } from 'src/app/services/rocksideprojectggtservice.service';
import { Router } from '@angular/router';
import { DialogContentComponent } from './dialog-content/dialog-content.component';

export interface Projects {
  id: number;
  Name: string;
  Position: string;
  Email: string;
  Mobile: number;
  DateOfJoining: Date;
  Salary: number;
  Projects: number;
  imagePath: string;
  household: string;
  gender: string;
  dob: string;
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  displayedColumns: string[] = [
    'Project Name',
    'Sector',
    // 'members',
    // 'managers',
    'Created By',
    'Date Created',
    'Action',
  ];
  dataSource: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator =
    Object.create(null);

  constructor(
    public dialog: MatDialog,
    public datePipe: DatePipe,
    private clientproject: ClientprojectService,
    private helperservice: helperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fectchAllProjects();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  //applys auto filters
  applyFilter(event: any): void {
    console.log(event);
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }
  //performs manual search
  searchData(row_obj: any) {
    delete row_obj['imagePath'];
    delete row_obj['action'];
    this.clientproject.searchProjects(row_obj).subscribe(
      (projects: any) => {
        projects.status
          ? this.setDataTable(projects.data.docs)
          : this.helperservice.dispalyError(projects.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  // fetches all data about projects
  fectchAllProjects() {
    this.clientproject.getAllProjects().subscribe(
      (sectors: any) => {
        sectors.status
          ? this.setDataTable(sectors.data.docs)
          : this.helperservice.dispalyError(sectors.msg);
        console.log(sectors);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  //set data in mat tables
  private setDataTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  // open dialogue method
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.fectchAllProjects();
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteData(result.data);
      } else if (result.event === 'Filter') {
        this.searchData(result.data);
      }
    });
  }

  //updates row data
  updateRowData(row_obj: Projects): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      if (value.id === row_obj.id) {
        value.Name = row_obj.Name;
        value.Position = row_obj.Position;
        value.Email = row_obj.Email;
        value.Mobile = row_obj.Mobile;
        value.DateOfJoining = row_obj.DateOfJoining;
        value.Salary = row_obj.Salary;
        value.Projects = row_obj.Projects;
        value.imagePath = row_obj.imagePath;
        value.household = row_obj.household;
        value.gender = row_obj.gender;
        value.dob = row_obj.dob;
      }
      return true;
    });
  }

  //delete function

  deleteData(row_obj: any) {
    this.clientproject.deleteProject(row_obj._id).subscribe(
      (action: any) => {
        this.helperservice.dispalyError(action.msg);
        action.status
          ? this.fectchAllProjects()
          : this.helperservice.dispalyError(action.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  public projectDetail(project: any) {
    console.log(project);
    this.router.navigate(['/Projectdetail', project._id], {
      queryParams: {
        profile: JSON.stringify(project),
      },
    });
  }
}
