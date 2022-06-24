import {Component, OnDestroy, OnInit} from "@angular/core";
import {catchError, combineLatest, filter, of, Subject, takeUntil} from "rxjs";

import {VehiclesService} from "@services";
import {IVehicle} from "@models";


@Component({
  selector: 'vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit, OnDestroy {

  searchString: string = '';
  vehicles: IVehicle[] = [];
  loading: boolean = true;
  selectedIds: string[] = [];
  loadingIds: string[] = [];

  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(public vehiclesService: VehiclesService) {}

  ngOnInit() {
    combineLatest([
      this.vehiclesService.loaded$,
      this.vehiclesService.loading$,
      this.vehiclesService.vehicles$
    ])
      .pipe(
        filter(([loaded, loading, _1]) => loaded && !loading),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(([_1, _2, vehicles]) => {
        this.loading = false;
        this.vehicles = vehicles;
      });
  }

  setSelectedIds(ids: string[]) {
    this.selectedIds = ids;
  }

  setLoadingIds(ids: string[]) {
    this.loadingIds = ids;
  }

  deleteVehicles(ids: string[]) {
    this.loadingIds = [...ids];
    this.vehiclesService.delete(ids)
      .pipe(catchError(() => of(null)))
      .subscribe(() => {
        this.loadingIds = [];
        this.selectedIds = [];
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
