import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
// import { CustomValidators } from 'ngx-custom-validators';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  form: any = {
    email: null,
  };
  isForgotPassword = false;
  isHideForm = true;
  message = '';
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // submits password reset details
  onSubmit(): void {
    const { email } = this.form;

    this.authService.forgotPassword(email).subscribe({
      next: (data) => {
        if (data?.status) {
          this.message = data?.message;
          this.isForgotPassword = true;
          this.isHideForm = true;
        } else {
          console.log(data);
          this.message = data?.message;
          this.isForgotPassword = false;
          this.isHideForm = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.message;
      },
    });
  }
}
