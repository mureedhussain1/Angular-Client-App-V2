import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }
  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        if (data.status) {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data, email);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.router.navigate(['/']);
        } else {
          this.errorMessage = data?.msg;
          this.isLoginFailed = true;
        }
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      },
    });
  }
}
