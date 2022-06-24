import {Component, HostBinding, OnInit} from "@angular/core";

import {VehicleUpsertComponent} from "./vehicle-upsert.component";
import {Router} from "@angular/router";
import {catchError, tap, throwError} from "rxjs";


@Component({
  selector: 'vehicle-create',
  templateUrl: './vehicle-upsert.component.html',
  styleUrls: ['./vehicle-upsert.component.scss']
})
export class VehicleCreateComponent extends VehicleUpsertComponent {

  pageTitle = 'Create vehicle';
  applyBtnText = 'Create';

  confirm() {
    this.vehiclesService.create(this.getVehicleForSaving).subscribe(() => {
      this.navigateToVehicles()
    });
  }

}
