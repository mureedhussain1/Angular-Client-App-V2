import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  loginerror = '';
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    // this.clearBrowser()
    // this.form = this.fb.group({
    //   email: [null, Validators.compose([Validators.email])],
    //   password: [null, Validators.compose([Validators.required])]
    // });
  }

  // clear browser cached data
  clearBrowser(){
    localStorage.clear()
  }

//sets sesion for user
  setSession(token:string){
    // this.authservice.saveToken(token)
    // this.router.navigate(['/dashboards/dashboard1'])
  }

  login(username: string, password: string) {
    // this.authservice.login(this.form.value).subscribe((details:any)=>{
    //   details.status ? this.setSession(details.token):
    //     this.loginerror = details.message;
    //   ;
    // },(error)=>{
    //   this.loginerror = error.message
    //   this.helperservice.dispalyError(this.loginerror)
    //   // console.log(this.loginerror)
    // });
  }
}
