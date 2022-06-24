import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {catchError, map, of} from "rxjs";

import {AuthService} from "@services";


@Injectable({
  providedIn: 'root'
})
export class DefaultRedirectGuard implements Resolve<any> {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.authService.checkUserSession()
      .pipe(
        map(() => {
          this.router.navigate(['content']);

          return false;
        }),
        catchError((err) => {
          return of(true)
        })
      )
  }
}
