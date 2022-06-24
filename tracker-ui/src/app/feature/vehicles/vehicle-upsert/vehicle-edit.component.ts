import {Component, OnInit} from "@angular/core";

import {VehicleUpsertComponent} from "./vehicle-upsert.component";
import {UpsertVehicleDto} from "@models"


@Component({
  selector: 'vehicle-edit',
  templateUrl: './vehicle-upsert.component.html',
  styleUrls: ['./vehicle-upsert.component.scss']
})
export class VehicleEditComponent extends VehicleUpsertComponent implements OnInit {

  pageTitle = 'Edit vehicle';
  applyBtnText = 'Save';
  id: string;

  ngOnInit() {
    this.id = this.route.snapshot.params.id;

    this.vehiclesService.getOne(this.id)
      .subscribe((vehicle) => {
        this.vehicleForm.patchValue({
          name: vehicle.name,
          description: vehicle.description
        });
      });
  }

  confirm() {
    this.vehiclesService.update(
      this.id,
      new UpsertVehicleDto(this.vehicleForm.value)
    ).subscribe(() => {
      this.navigateToVehicles();
    });
  }
}
