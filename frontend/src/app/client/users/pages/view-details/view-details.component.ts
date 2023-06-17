import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {JobsService} from "../../../../server/jobs/jobs.service";

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  id: any;
  data: any;
  tab = 'recruiter';
  keys = [];

  constructor(private router: Router, private service: JobsService) {
    let routes = this.router.url.split('/');
    this.id = routes[routes.length - 1];
  }

  ngOnInit(): void {
    console.log('1234')
    this.service.getById(this.id).subscribe((res) => {
      this.data = res;
      console.log(this.data)
      // @ts-ignore
      this.keys = Object.keys(this.data);
    })
  }

  back() {
    this.router.navigate(['']);
  }

}
