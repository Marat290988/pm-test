import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService
  ){}

  intercept(
    req: HttpRequest<any>, 
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.userService.user) {
      req = req.clone({
        setHeaders: {
          Authorization: `Token ${this.userService.user.token}`
        }
      });
    }
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          // this.userService.logout();
          return throwError(() => {
            new Error(error.message);
          });
        })
      )
  }
}