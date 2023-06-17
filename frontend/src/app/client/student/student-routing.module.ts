import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentComponent} from "./student.component";
import {SelectedJobsComponent} from "./jobs/selected-jobs/selected-jobs.component";

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
  {
    path: 'mylist',
    component: SelectedJobsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
