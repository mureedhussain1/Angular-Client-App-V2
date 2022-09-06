import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';

const routes: Routes = [
  // { path: '', component: AuthenticationComponent },
  { path: '', component: LoginComponent },
  {
    path: 'lockscreen',
    component: LockscreenComponent,
  },
  { path: 'forgot', component: ForgetPasswordComponent },
  { path: 'confirm', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {}
