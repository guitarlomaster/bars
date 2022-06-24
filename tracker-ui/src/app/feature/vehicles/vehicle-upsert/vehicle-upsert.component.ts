import {Component, OnDestroy} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";

import {UpsertVehicleDto} from "@models";
import {VehiclesService} from "@services";


@Component({
  selector: '',
  template: '<div></div>'
})
export abstract class VehicleUpsertComponent implements OnDestroy {

  loading$: Observable<boolean> = this.vehiclesService.loading$;
  vehicleForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  });

  abstract pageTitle: string;
  abstract applyBtnText: string;

  protected readonly ngUnsubscribe$ = new Subject<void>();

  get getVehicleForSaving(): UpsertVehicleDto {
    return new UpsertVehicleDto({ ...this.vehicleForm.value });
  }

  constructor(
    protected vehiclesService: VehiclesService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
  }

  navigateToVehicles() {
    this.router.navigate(['content', 'vehicles']);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
