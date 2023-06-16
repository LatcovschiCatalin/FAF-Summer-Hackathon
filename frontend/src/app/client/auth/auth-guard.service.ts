import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {tap} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      tap(authenticated => {

        if (!authenticated) {
          this.router.navigate(['auth/login']);
        }
      })
    );
  }
}

