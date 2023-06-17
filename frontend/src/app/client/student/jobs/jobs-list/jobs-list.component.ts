import {Component, OnInit} from '@angular/core';
import {JobsService} from "../../../../server/jobs/jobs.service";
import {Jobs} from "../../../../server/jobs/jobs";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  constructor(private jobsService: JobsService) {
  }

  jobs: Jobs[] = [];

  filteredData = this.jobs;
  searchValue = '';

  ngOnInit(): void {
    this.jobsService.get().subscribe((res) => {
      this.jobs = res;
      this.filteredData = this.jobs
      console.log(res)
    })
  }

  search() {
    this.filteredData = this.jobs.filter(item => {
      return Object.values(item).some(value => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(this.searchValue.toLowerCase());
        }
        return false;
      });
    });
  }

  apply() {

  }
}
