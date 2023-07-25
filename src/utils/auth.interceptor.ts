import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { MessageService } from "src/app/services/message.service";
import { UserService } from 'src/app/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private message: MessageService
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
          if (error.error.message) {
            this.message.showMessage(error.error.message);
            this.userService.logout();
          }
          if (error.error.title && error.error.title[0]) {
            this.message.showMessage(error.error.title[0]);
          }
          return throwError(() => {
            new Error(error.message);
          });
        })
      )
  }
}
