import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authService.getToken();
    let cloned;
    if (token) {
      cloned = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
