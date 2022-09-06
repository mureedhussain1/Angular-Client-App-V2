import {
  Component,
  OnInit,
  Inject,
  Optional,
  ViewChild,
  getModuleFactory,
} from '@angular/core';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ClientprojectService } from 'src/app/services/clientproject.service';
import { helperService } from 'src/app/services/helper.service';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { AddTeamMemberComponent } from './dialog-content/dialog-content.component';
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
  templateUrl: './project-detail.component.html',
})
export class ProjectDetailComponent implements OnInit {
  projectid: any;
  @ViewChild(MatTable, { static: true }) table: MatTable<any> =
    Object.create(null);
  searchText: any;
  totalCount = -1;
  Closed = -1;
  Inprogress = -1;
  Open = -1;

  displayedColumns: string[] = [
    'Names',
    'Role',
    'Assignee',
    'Date Created',
    'Action',
  ];
  dataSource: any;
  paginator: any;
  projectprofile: any;
  projectmodules: any;
  questionairecount: any = [];

  constructor(
    public dialog: MatDialog,
    public route: ActivatedRoute,
    private userService: UserService,
    private helperservice: helperService,
    public router: Router,
    private clientproject: ClientprojectService
  ) {
    this.projectid = this.route.snapshot.paramMap.get('id');
    localStorage.setItem('projectid', this.projectid);
    this.getProjectProfile();
    this.fetchModules();
  }

  ngOnInit(): void {
    this.fetchTeamMembers();
    this.totalCount = this.dataSource.data.length;
    this.Open = this.btnCategoryClick('Open');
    this.Closed = this.btnCategoryClick('Closed');
    this.Inprogress = this.btnCategoryClick('In Progress');
    this.getProjectProfile();
    this.fetchModules();
  }

  //link to active module

  goToActiveModule(module: any) {
    this.router.navigate(['/App/Module/project/module'], {
      queryParams: {
        module: JSON.stringify(module),
        moduleid: JSON.stringify(module._id),
        projectid: JSON.stringify(this.projectid),
      },
    });
  }
  //link to project
  goTo(route: string) {
    // this.router.navigateByUrl(`/App/${route}/${this.projectid}`);
    this.router.navigateByUrl(`/${route}`);
  }
  // fetch project modules
  fetchModules() {
    this.clientproject.getProjectModules(this.projectid).subscribe(
      (sectors: any) => {
        sectors.status
          ? (this.dataSource = sectors.data.docs)
          : this.helperservice.dispalyError(sectors.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  // render team members for project
  fetchTeamMembers() {
    this.clientproject.getTeamMembers(this.projectid).subscribe(
      (sectors: any) => {
        sectors.status
          ? (this.dataSource = sectors.data.docs)
          : this.helperservice.dispalyError(sectors.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  // method to delete project member
  deleteData(row_obj: any) {
    this.clientproject.deleteTeamMember(row_obj._id, this.projectid).subscribe(
      (action: any) => {
        this.helperservice.dispalyError(action.msg);
        action.status
          ? this.fetchTeamMembers()
          : this.helperservice.dispalyError(action.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  // filter method
  applyFilter(filterValue: any): void {
    this.dataSource.filter = filterValue.target.value.trim().toLowerCase();
  }
  //filter and count data
  btnCategoryClick(val: string): number {
    this.dataSource.filter = val.trim().toLowerCase();
    return this.dataSource.filteredData.length;
  }
  // open dialogue method
  openDialog(action: string, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(AddTeamMemberComponent, {
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'Add') {
        this.fetchTeamMembers();
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteData(result.data);
      }
    });
  }
  // add data  to row
  addRowData(row_obj: TicketElement): void {
    const d = new Date();
    this.dataSource.data.push({
      id: d.getTime(),
      creator: row_obj.creator,
      title: row_obj.title,
      assignee: row_obj.assignee,
      status: row_obj.status,
      labelbg: row_obj.labelbg,
      product: row_obj.product,
      date: row_obj.date,
    });
    this.table.renderRows();
  }
  //search data function
  searchData(row_obj: any) {
    delete row_obj['imagePath'];
    delete row_obj['action'];
    this.clientproject.getTeamMembers(row_obj).subscribe(
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

  //set data in tables

  private setDataTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  // update row data in tables
  updateRowData(row_obj: any): boolean | any {
    this.clientproject.EditProject(row_obj).subscribe(
      (edit: any) => {
        this.helperservice.dispalyError(edit.msg);
        edit.status ? '' : this.helperservice.dispalyError(edit.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  // delete row data
  deleteRowData(row_obj: TicketElement): boolean | any {
    this.dataSource.data = this.dataSource.data.filter((value: any) => {
      return value.id !== row_obj.id;
    });
  }
  // get project data
  getProjectProfile() {
    this.clientproject.getProjectProfile(this.projectid).subscribe(
      (edit: any) => {
        this.projectprofile = edit.data[0];
        this.projectmodules = edit.data[0]['modules'];
        this.getModuleIds(this.projectmodules);
        console.log(this.projectmodules);
        this.helperservice.dispalyError(edit.msg);
        edit.status ? '' : this.helperservice.dispalyError(edit.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
  // function to get module ids
  getModuleIds(data: any) {
    const sortedids = data
      .filter((res: any) => res.module._id)
      .map((result: any) => result.module._id);
    console.log(sortedids);
    sortedids.forEach((element: any) => {
      this.getModuleQuestionairred(element._id);
    });
  }
  // function to get questionaires attached to module
  getModuleQuestionairred(id: any) {
    this.clientproject.getModuleQuestionairred(this.projectid, id).subscribe(
      (action: any) => {
        console.log(action.data.docs);
        action.status ? (this.questionairecount = action.data.docs) : '';
        this.helperservice.dispalyError(action.msg);
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }
}
