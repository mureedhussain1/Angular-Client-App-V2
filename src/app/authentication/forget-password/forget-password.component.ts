import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   email: [
    //     null,
    //     Validators.compose([Validators.required, CustomValidators.email])
    //   ]
    // });
  }
  // submits password reset details
  onSubmit(): void {
    // this.userservice.requestPasswordResset(this.form.value).subscribe(
    //   (action: any) => {
    //     this.helperservice.dispalyError(action.msg || action);
    //   },
    //   (error: any) => {
    //     this.helperservice.dispalyError(error.error);
    //   }
    // );
  }
}
