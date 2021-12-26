import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { MaterialComponentsModule } from '../material-component/material.module';
import { DemoMaterialModule } from '../demo-material-module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LockscreenComponent } from './lockscreen/lockscreen.component';

@NgModule({
  declarations: [
    AuthenticationComponent,
    ForgetPasswordComponent,
    LoginComponent,
    ResetPasswordComponent,
    LockscreenComponent,
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    // MaterialComponentsModule,
    FlexLayoutModule,
    DemoMaterialModule,
    FormsModule,
  ],
})
export class AuthenticationModule {}
