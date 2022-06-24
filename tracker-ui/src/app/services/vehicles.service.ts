import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";

import {API_PATHS} from "@constant";
import {IVehicle, UpsertVehicleDto, Vehicle} from "@models";


@Injectable()
export class VehiclesService {

  private readonly _vehicles$ = new BehaviorSubject<IVehicle[]>([]);
  private readonly _loading$ = new BehaviorSubject<boolean>(false);
  private readonly _loaded$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
  }

  get vehicles(): IVehicle[] {
    return this._vehicles$.getValue();
  }

  get vehicles$(): Observable<IVehicle[]> {
    return this._vehicles$;
  }

  get loading(): boolean {
    return this._loading$.getValue();
  }

  get loading$(): Observable<boolean> {
    return this._loading$;
  }

  get loaded(): boolean {
    return this._loaded$.getValue();
  }

  get loaded$(): Observable<boolean> {
    return this._loaded$;
  }

  load(): Observable<IVehicle[]> {
    const obs$ = this.http.get<IVehicle[]>(API_PATHS.VEHICLES);

    this._loading$.next(true);

    obs$.subscribe((vehicles) => {
      const adjustedVehicles = vehicles.map((v) => new Vehicle(v));

      this._vehicles$.next(adjustedVehicles);
      this._loading$.next(false);
      this._loaded$.next(true);
    });

    return obs$;
  }

  getOne(id: string): Observable<IVehicle> {
    this._loading$.next(true);

    return this.http.get<IVehicle>(`${API_PATHS.VEHICLES}/${id}`)
      .pipe(
        tap((vehicle) => {
          const storedVehicles = this._vehicles$.getValue();
          const existingVehicle = storedVehicles.find((v) => v.id === id);

          if (existingVehicle) {
            this._vehicles$.next(
              storedVehicles.map((v) => v.id === id ? new Vehicle(vehicle) : v)
            );
          } else {
            this._vehicles$.next([...storedVehicles, vehicle]);
          }
          this._loading$.next(false);
        }),
        catchError((err) => {
          this._loading$.next(false);
          return throwError(err);
        })
      );
  }

  delete(ids: string[]): Observable<void> {
    this._loading$.next(true);

    return this.http.delete<void>(`${API_PATHS.VEHICLES}`, {body: {ids}})
      .pipe(
        tap(() => {
          const result = this._vehicles$
            .getValue()
            .filter((v) => !ids.includes(v.id));

          this._vehicles$.next(result);
          this._loading$.next(false)
        }),
        catchError((err) => {
          this._loading$.next(false);
          return throwError(err);
        })
      );
  }

  create(createVehicleDto: UpsertVehicleDto): Observable<IVehicle> {
    this._loading$.next(true);

    return this.http.post<IVehicle>(`${API_PATHS.VEHICLES}`, createVehicleDto)
      .pipe(
        tap((vehicle) => {
          const currentVehicles = this._vehicles$.getValue();
          const vehicles = [...currentVehicles, new Vehicle(vehicle)];

          this._vehicles$.next(vehicles);
          this._loading$.next(false);
        })
      );
  }

  update(id: string, updateVehicleDto: UpsertVehicleDto): Observable<IVehicle> {
    this._loading$.next(true);

    return this.http.put<IVehicle>(`${API_PATHS.VEHICLES}/${id}`, updateVehicleDto)
      .pipe(
        tap((vehicle) => {
          const result = this._vehicles$
            .getValue()
            .map((v) => vehicle.id === id ? new Vehicle(vehicle) : v);

          this._vehicles$.next(result);
          this._loading$.next(false);
        }),
        catchError((err) => {
          this._loading$.next(false);
          return throwError(err);
        })
      );
  }

}
