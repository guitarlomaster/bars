import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {SharedModule} from "@feature/shared";
import {VehiclesTableComponent} from "./vehicles/vehicles-table.component";


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    VehiclesTableComponent
  ],
  declarations: [
    VehiclesTableComponent
  ]
})
export class TablesModule {
}
