import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss'],
})
export class AdminprofileComponent implements OnInit {
  npk: any;
  adminprofile: any;
  constructor(public router: Router, public authservice: AuthService) {
    // snapshot to capture active route
    this.npk = this.router.routerState.snapshot.url;

    // code snippet to set active url takes b2b as argument and this.npk as value
    localStorage.setItem('b2b', this.npk);

    //listens to user who's logged in
    this.adminprofile = this.authservice.getLoggedInProfile();
    console.log(this.adminprofile);
  }

  ngOnInit(): void {}
}
