import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {HeaderComponent} from "./header/header.component";
import {BREADCRUMBS_ROUTE_DATA} from "@constant";


const routes: Routes = [
  {
    path: '',
    component: HeaderComponent,
    children: [
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      {
        path: 'vehicles',
        loadChildren: () => import('@feature/vehicles').then((m) => m.VehiclesModule),
        data: {
          [BREADCRUMBS_ROUTE_DATA.NAME]: 'Vehicles',
          [BREADCRUMBS_ROUTE_DATA.DISABLED]: true,
          [BREADCRUMBS_ROUTE_DATA.UPLINK]: true
        }
      },
      { path: '**', redirectTo: 'vehicles' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
