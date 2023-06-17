import {Component, OnInit} from '@angular/core';
import {JobsService} from "../../../../server/jobs/jobs.service";
import {Jobs} from "../../../../server/jobs/jobs";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";
import {Users} from "../../../../server/users/users";
import {of} from "rxjs";

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.scss']
})
export class JobsListComponent implements OnInit {

  constructor(private jobsService: JobsService, private usersService: UsersService, private cookieService: CookieService) {
  }

  jobs: any[] = [];

  filteredData = this.jobs;
  searchValue = '';

  user = {
    jobs: [],
    id: 0
  }

  recruiters = [{
    jobs: [],
    id: 0,
    email: ''
  }]

  ngOnInit(): void {
    this.jobsService.get().subscribe((res) => {
      this.jobs = res;
      this.filteredData = this.jobs
    })
    this.usersService.get(this.cookieService.get('role')).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].email == this.cookieService.get('user')) {
          // @ts-ignore
          this.user = res[i];
        }
      }
    })
    this.usersService.get('recruiter').subscribe((res) => {
      // @ts-ignore
      this.recruiters = res;
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

  apply(id: number) {
    for (let i = 0; i < this.jobs.length; i++) {
      // @ts-ignore
      if (this.jobs[i]['id'] === id) {
        let jobs: Jobs[] = this.user.jobs;
        jobs.push(this.jobs[i]);
        for (let j = 0; j < this.recruiters.length; j++) {
          if (this.recruiters[j].email == this.jobs[i].recruiter) {
            // @ts-ignore
            let offers = this.recruiters[j].jobs;
            // @ts-ignore
            offers.push(this.user);
            this.recruiters[j].jobs = offers
            let id2 = this.recruiters[j].id
            // @ts-ignore
            this.usersService.put(this.recruiters[j], id2, 'recruiter').subscribe((res) => {
            })
            break;
          }
        }
        // @ts-ignore
        this.user.jobs = jobs
        let id = this.user.id
        // @ts-ignore
        this.usersService.put(this.user, id, 'student').subscribe((res) => {
        })
        break;
      }
    }
  }
}
