import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {UsersService} from "../../../server/users/users.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {

  selected = 'dark'
  data = {
    title: "Users list"
  }

  user = {
    "name": '',
    "surname": ''
  }

  constructor(private authService: AuthService, private usersService: UsersService, private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.usersService.get(this.cookieService.get('role')).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (res[i].email == this.cookieService.get('user')) {
          this.user = res[i];
        }
      }
    })
  }


  logOut() {
    if (window.confirm('Are you sure you want to log out?')) {
      return this.authService.logout();
    }
  }

}
