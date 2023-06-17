import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private _snackBar: MatSnackBar) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {

    const expectedRoles = route.data['roles'];
    if (expectedRoles) {
      const token = this.auth.getToken();

      if (token) {
        // const parsedToken = this.auth.parseJwt(token);
        let roles: string[] = ['student', 'recruiter'];

        // if (parsedToken.role && typeof parsedToken.role === 'string') {
        //   roles = [parsedToken.role]
        // } else if (parsedToken.role?.length) {
        //   roles = parsedToken.role;
        // }

        if (!roles.length) {
          this._snackBar.open('You have no roles to access this route!', '401', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 5000,
            panelClass: 'error'
          })
          return of(false);
        } else {
          let allRolesEligible = true;

          expectedRoles.forEach((role: string) => {
            if (!roles.find(el => el === role)) {
              allRolesEligible = false;
            }
          })

          if (!allRolesEligible) {
            this._snackBar.open('You have no roles to access this route!', '401', {
              horizontalPosition: 'end',
              verticalPosition: 'top',
              duration: 5000,
              panelClass: 'error'
            })
          }

          return of(allRolesEligible)
        }
      } else {
        this._snackBar.open('You have no roles to access this route!', '401', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
          panelClass: 'error'
        })
        this.router.navigate(['auth/login']);
        return of(false);
      }
    } else {
      this
        ._snackBar
        .open(
          'You have no roles to access this route!'
          ,
          '401'
          , {
            horizontalPosition: 'end'
            ,
            verticalPosition: 'top'
            ,
            duration: 5000
            ,
            panelClass: 'error'
          }
        )
      return of(false);
    }
  }
}
