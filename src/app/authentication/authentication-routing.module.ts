import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  // { path: '', component: AuthenticationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgetPasswordComponent },
  { path: 'confirm', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
