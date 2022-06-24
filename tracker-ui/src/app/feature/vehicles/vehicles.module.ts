import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {TablesModule} from "@feature/tables";
import {VehiclesComponent} from "./vehicles/vehicles.component";
import {VehicleEditComponent} from "./vehicle-upsert/vehicle-edit.component";
import {VehicleCreateComponent} from "./vehicle-upsert/vehicle-create.component";
import {VehiclesRoutingModule} from "./vehicles-routing.module";
import {SharedModule} from "@feature/shared";
import {DirectivesModule} from "@directives";


@NgModule({
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    TablesModule,
    SharedModule,
    DirectivesModule
  ],
  declarations: [
    VehiclesComponent,
    VehicleEditComponent,
    VehicleCreateComponent
  ]
})
export class VehiclesModule { }
