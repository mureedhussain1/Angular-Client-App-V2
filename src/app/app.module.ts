import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialComponentsModule } from './material-component/material.module';
import { VerticalAppHeaderComponent } from './full-layout/vertical-header/vertical-header.component';
import { VerticalAppSidebarComponent } from './full-layout/vertical-sidebar/vertical-sidebar.component';
import { AppBreadcrumbComponent } from './full-layout/breadcrumb/breadcrumb.component';
import { HorizontalAppHeaderComponent } from './full-layout/horizontal-header/horizontal-header.component';
import { HorizontalAppSidebarComponent } from './full-layout/horizontal-sidebar/horizontal-sidebar.component';
import { DemoMaterialModule } from './demo-material-module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SpinnerComponent } from './shared/spinner.component';
import { MenuItems } from './shared/menu-items/menu-items';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    VerticalAppHeaderComponent,
    // SpinnerComponent,
    // AppBlankComponent,
    VerticalAppSidebarComponent,
    AppBreadcrumbComponent,
    HorizontalAppHeaderComponent,
    HorizontalAppSidebarComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    // MaterialComponentsModule,
    DemoMaterialModule,
    PerfectScrollbarModule,
    HttpClientModule,

  ],
  providers: [MenuItems],
  bootstrap: [AppComponent]
})
export class AppModule { }
