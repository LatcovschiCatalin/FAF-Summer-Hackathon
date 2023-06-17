import {Component, OnInit} from '@angular/core';
import {Jobs} from "../../../../server/jobs/jobs";
import {JobsService} from "../../../../server/jobs/jobs.service";
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-selected-jobs',
  templateUrl: './selected-jobs.component.html',
  styleUrls: ['./selected-jobs.component.scss']
})
export class SelectedJobsComponent implements OnInit {

  jobs = [
    {
      "image": '',
      "title": '',
      "payment": '',
      "deadline": '',
      "duration": '',
      "students": 0,
      "description": '',
      "location": '',
    }
  ]

  constructor(private usersService: UsersService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.usersService.get(this.cookieService.get('role')).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].email == this.cookieService.get('user')) {
          this.jobs = res[i].jobs;
        }
      }
    })
  }

}
