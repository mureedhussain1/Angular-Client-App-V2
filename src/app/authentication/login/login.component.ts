import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMsg = '';

  constructor() { }

  ngOnInit(): void {
  }
  login(username: string, password: string) {

    // const output = this.service.checkusernameandpassword(uname, p);
    // if (output == true) {
    //   this.routes.navigate(['/starter']);
    // } else {
    //   this.msg = 'Invalid Username or Password';
    // }
  }
}
