import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(private snack: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req)
      .pipe(
        catchError((err) => {
          this.snack.open(err.error?.message ?? err.message, 'Ok',{
            horizontalPosition: 'end',
            verticalPosition: 'top',
            duration: 3000
          });
          return throwError(err);
        })
      );
  }
}
