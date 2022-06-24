import {NgModule} from "@angular/core";
import {SharedModule} from "../shared";
import {CommonModule} from "@angular/common";

import {ContentRoutingModule} from "./content-routing.module";
import {HeaderComponent} from "./header/header.component";
import {VehiclesModule} from "@feature/vehicles";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {DirectivesModule} from "@directives";


@NgModule({
  imports: [
    CommonModule,
    ContentRoutingModule,
    VehiclesModule,
    SharedModule,
    DirectivesModule
  ],
  declarations: [
    HeaderComponent,
    BreadcrumbComponent,
  ],
  providers: []
})
export class ContentModule { }
