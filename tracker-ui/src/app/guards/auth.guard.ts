import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";

import {AuthService} from "@services";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.currentUser) {
      return true;
    }

    return this.authService.checkUserSession()
      .pipe(
        map(() => true),
        catchError(() => {
          this.router.navigate(['auth']);

          return of(false);
        })
      )
  }
}
