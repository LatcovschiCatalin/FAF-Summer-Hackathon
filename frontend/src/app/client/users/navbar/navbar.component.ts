import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

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


  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }


  logOut() {
    if (window.confirm('Are you sure you want to log out?')) {
      return this.authService.logout();
    }
  }

}
