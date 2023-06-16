import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./client/auth/auth-guard.service";
import {AuthService} from "./client/auth/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {RoleGuard} from "./client/auth/role-guard.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSnackBarModule
  ],
  providers: [AuthGuard, AuthService, RoleGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
