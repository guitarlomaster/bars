import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {IUser, UserCredentialsDto} from "@models";
import {API_PATHS} from "@constant";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly _currentUser$ = new BehaviorSubject<IUser | null>(null);
  private readonly _isDeletingUser$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  get currentUser$(): Observable<IUser | null> {
    return this._currentUser$;
  }

  get currentUser(): IUser | null {
    return this._currentUser$.getValue();
  }

  get isDeletingUser$(): Observable<boolean> {
    return this._isDeletingUser$;
  }



  checkUserSession() {
    return this.http.get<IUser>(API_PATHS.SESSION)
      .pipe(
        tap((user) => this._currentUser$.next(user))
      );
  }

  signIn(userCredentialsDto: UserCredentialsDto): Observable<IUser> {
    return this.http.post<IUser>(API_PATHS.LOGIN, userCredentialsDto)
      .pipe(
        tap((user) => this._currentUser$.next(user))
      );
  }

  signUp(userCredentialsDto: UserCredentialsDto): Observable<IUser> {
    return this.http.post<IUser>(API_PATHS.REGISTER, userCredentialsDto)
      .pipe(
        tap((user) => this._currentUser$.next(user))
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(API_PATHS.LOGOUT, null)
      .pipe(
        tap(() => this._currentUser$.next(null))
      );
  }

  deleteUser() {
    this._isDeletingUser$.next(true);
    return this.http.delete(`${API_PATHS.USERS}/current`)
      .pipe(
        catchError((err) => {
          this._isDeletingUser$.next(false);
          return throwError(err);
        }),
        tap(() => {
          this._currentUser$.next(null);
          this._isDeletingUser$.next(false);
        })
      );
  }

}
