import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { HeaderComponent } from './header/header.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobsListComponent } from './jobs/jobs-list/jobs-list.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StudentComponent,
    HeaderComponent,
    JobsComponent,
    JobsListComponent
  ],
    imports: [
        CommonModule,
        StudentRoutingModule,
        FormsModule
    ]
})
export class StudentModule { }
