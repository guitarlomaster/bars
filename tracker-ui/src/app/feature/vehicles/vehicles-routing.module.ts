import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {VehiclesComponent} from "./vehicles/vehicles.component";
import {VehicleCreateComponent} from "./vehicle-upsert/vehicle-create.component";
import {VehicleEditComponent} from "./vehicle-upsert/vehicle-edit.component";
import {BREADCRUMB_SERVICES, BREADCRUMBS_ROUTE_DATA} from "@constant";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: VehiclesComponent,
  },
  {
    path: 'create',
    component: VehicleCreateComponent,
    data: {
      [BREADCRUMBS_ROUTE_DATA.NAME]: 'Create',
      [BREADCRUMBS_ROUTE_DATA.DISABLED]: false,
      [BREADCRUMBS_ROUTE_DATA.UPLINK]: false
    }
  },
  {
    path: ':id',
    component: VehicleEditComponent,
    data: {
      [BREADCRUMBS_ROUTE_DATA.NAME]: ':id',
      [BREADCRUMBS_ROUTE_DATA.DISABLED]: false,
      [BREADCRUMBS_ROUTE_DATA.UPLINK]: false,
      [BREADCRUMBS_ROUTE_DATA.SERVICE]: BREADCRUMB_SERVICES.VEHICLE
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
