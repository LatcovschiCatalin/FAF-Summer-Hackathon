import { Component, OnInit } from '@angular/core';
import {UsersService} from "../../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-offerts',
  templateUrl: './offerts.component.html',
  styleUrls: ['./offerts.component.scss']
})
export class OffertsComponent implements OnInit {
  jobs = [
    {
      "phone": '',
      "name": '',
      "surname": '',
    }
  ]

  constructor(private usersService: UsersService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.usersService.get(this.cookieService.get('role')).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].email == this.cookieService.get('user')) {
          // @ts-ignore
          this.jobs = res[i];
          // @ts-ignore
          console.log(this.jobs['jobs'])
        }
      }
    })
  }
}
