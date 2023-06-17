import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {of} from "rxjs";
import {UsersService} from "../../server/users/users.service";
import {Users} from "../../server/users/users";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private cookieService: CookieService,
    private crudService: UsersService) {
  }

  token = 'usertoken123'

  login(user: Users, tab: String) {
    let findUser = false;
    this.crudService.get(tab).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (user.email === res[i].email) {
          findUser = true;
          this.cookieService.set('user', user.email);
          // @ts-ignore
          this.cookieService.set('role', tab);
          localStorage.setItem('user_jwt', JSON.stringify(this.token));
          this.router.navigateByUrl(`/` + (tab == 'recruiter' ? tab : ''));
          this.snackBar.open('Welcome!', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'success'
          })

          break;
        }
      }
      if (!findUser) {
        this.snackBar.open('The user is not found. Try again!', '', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'error'
        })
      }
    })
  }

  register(user: Users, tab: String) {
    let post = true;
    this.crudService.get(tab).subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        if (user.email === res[i].email) {
          post = false;
          this.snackBar.open('Users with this email already exists!', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'error'
          })
          break;
        }
      }
      if (post) {
        this.crudService.post(user, tab).subscribe((res) => {
          localStorage.setItem('user_jwt', JSON.stringify(this.token));
          this.cookieService.set('user', user.email);
          // @ts-ignore
          this.cookieService.set('role', tab);
          this.router.navigateByUrl(`/` + (tab == 'recruiter' ? tab : ''));
          this.snackBar.open('Welcome!', '', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'success'
          })
        })
      }
    })

    return this.token;
  }

  logout() {
    localStorage.removeItem("user_jwt");
    this.router.navigate(['auth/login']);
    this.snackBar.open('Log out successfully', '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'success'
    })

  }

  getToken() {
    return localStorage.getItem("user_jwt");
  }

  isAuthenticated() {
    const jwtSession = localStorage.getItem("user_jwt");

    if (jwtSession) {
      return of(this.getExpiration(jwtSession) >= moment().unix());
    } else {
      return of(false);
    }
  }

  getExpiration(token: string): number {
    // const parsedJwt = this.parseJwt(token);

    // if (parsedJwt) {
    //   return parsedJwt.exp;
    // }

    return moment().unix();
  }

  // parseJwt(token: string) {
  //   let base64Url = token?.split('.')[1];
  //   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   let jsonPayload = decodeURIComponent(window.atob(base64)?.split('').map(function (c) {
  //     return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //   }).join(''));
  //
  //   return JSON.parse(jsonPayload);
  // };
}
