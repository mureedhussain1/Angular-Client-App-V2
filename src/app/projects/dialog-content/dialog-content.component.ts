import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClientprojectService } from 'src/app/services/clientproject.service';
import { helperService } from 'src/app/services/helper.service';
import { RocksideProjectMgtService } from 'src/app/services/rocksideprojectggtservice.service';

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
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent {
  action: string;
  // tslint:disable-next-line - Disables all
  local_data: any;
  selectedImage: any = '';
  joiningDate: any = '';
  selectedValue: any = '';
  systemroles: any = '';
  sectors: any = '';
  filteredroles: any = '';
  clients: any = '';
  private additionerror = false;
  invitationerror = false;
  npk: any;

  constructor(
    public datePipe: DatePipe,
    private clientproject: ClientprojectService,
    private helperservice: helperService,
    public router: Router,
    private rocksideService: RocksideProjectMgtService,
    public dialogRef: MatDialogRef<DialogContentComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Projects
  ) {
    this.npk = this.router.routerState.snapshot.url;
    localStorage.setItem('b2b', this.npk);
    this.local_data = { ...data };
    this.action = this.local_data.action;
    console.log(data);
    if (this.local_data.DateOfJoining !== undefined) {
      this.joiningDate = this.datePipe.transform(
        new Date(this.local_data.DateOfJoining),
        'yyyy-MM-dd'
      );
    }
    if (this.local_data.imagePath === undefined) {
      this.local_data.imagePath = 'assets/images/users/default.png';
    }
    this.getClientSectors();
  }
  // get client sectors

  getClientSectors() {
    this.clientproject.getSectors().subscribe(
      (sectors: any) => {
        sectors.status ? (this.sectors = sectors.data) : '';
      },
      (error: any) => {
        this.helperservice.dispalyError(error.error);
      }
    );
  }

  doAction(): void {
    if (this.action == 'Add') {
      if (
        this.local_data.projectname &&
        this.local_data.description &&
        this.local_data.sector
      ) {
        this.clientproject.AddNewProject(this.local_data).subscribe(
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
  //close dialogue
  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
  //select images function

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
}
