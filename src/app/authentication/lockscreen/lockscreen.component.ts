import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.scss'],
})
export class LockscreenComponent implements OnInit {
  form: any = {
    password: null,
  };
  user: any;
  loginerror: any;
  formdata: any;
  redircturl: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService,
    private tokenservice: TokenStorageService
  ) {
    this.redircturl = localStorage.getItem('b2b');
  }

  ngOnInit(): void {
    this.user = this.authservice.getLoggedInProfile();
  }

  onSubmit(): void {
    const { password } = this.form;
    console.log(password);
    this.formdata = this.form.value;
    // console.log(this.user)
    this.formdata.email = this.user.email;
    //authenticates user when locked out
    this.authservice
      .login(this.formdata.email, this.formdata.password)
      .subscribe(
        (details: any) => {
          details.status
            ? this.setSession(details.token)
            : (this.loginerror = details.msg);
        },
        (error) => {
          this.loginerror = error.error;
        }
      );
  }
  //sets session for user
  setSession(token: string) {
    this.tokenservice.saveToken(token);
    this.router.navigate([this.redircturl]);
  }
}
