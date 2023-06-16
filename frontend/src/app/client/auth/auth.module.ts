import {NgModule} from '@angular/core';
import {AuthGuard} from './auth-guard.service';
import {AuthService} from './auth.service';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthRoutingModule} from "./auth-routing.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import { RegisterComponent } from './register/register.component';
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  imports: [
    ReactiveFormsModule,
    AuthRoutingModule,
    NgForOf,
    NgIf,
    NgClass,
    MatTabsModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    MatSnackBarModule
  ],
  exports: [],
  declarations: [
    LoginComponent,
    RegisterComponent
  ]
})
export class AuthModule {
}
