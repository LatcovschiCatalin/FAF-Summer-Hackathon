import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './users.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MatSelectModule} from "@angular/material/select";
import {CookieService} from "ngx-cookie-service";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from './footer/footer.component';
import {ServicesModule} from "../services/services.module";
import {UsersService} from "../../server/users/users.service";
import {HttpClientModule} from "@angular/common/http";
import {JobsService} from "../../server/jobs/jobs.service";


@NgModule({
  declarations: [
    UsersComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    MatSelectModule,
    FormsModule,
    ServicesModule,
  ],
  providers: [CookieService, UsersService, JobsService]
})
export class UsersModule {
}
