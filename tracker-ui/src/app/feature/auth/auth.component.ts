import {Component, OnDestroy, OnInit} from "@angular/core";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, Subject, takeUntil, throwError} from "rxjs";

import {AUTH_TYPE_ROUTE_DATA, AUTH_TYPE_ROUTE_DATA_KEY} from "@constant";
import {AuthService} from "@services";
import {UserCredentialsDto} from "@models";


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  pageTitle = 'Sign up';
  authType: AUTH_TYPE_ROUTE_DATA | undefined;
  hidePassword = true;
  loginMinCharsLength = 3;
  authFormGroup = new FormGroup({
    login: new FormControl('', [Validators.required, Validators.minLength(this.loginMinCharsLength)]),
    password: new FormControl('', [Validators.required])
  });
  loading = false;

  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.route.data
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((data) => {
        this.authType = data[AUTH_TYPE_ROUTE_DATA_KEY];
      });
  }

  getFormControl(key: string): AbstractControl {
    return this.authFormGroup.get(key) as AbstractControl;
  }

  submit() {
    this.loading = true;

    if (this.authType === AUTH_TYPE_ROUTE_DATA.SIGN_IN) {
      this.authService.signIn(new UserCredentialsDto(this.authFormGroup.value))
        .pipe(
          catchError((err) => {
            this.loading = false;
            return throwError(err);
          })
        )
        .subscribe(() => this.router.navigate(['content']));
    } else {
      this.authService.signUp(new UserCredentialsDto(this.authFormGroup.value))
        .pipe(
          catchError((err) => {
            this.loading = false;
            return throwError(err);
          })
        )
        .subscribe(() => this.router.navigate(['content']));
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
