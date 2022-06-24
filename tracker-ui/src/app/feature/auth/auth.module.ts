import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {AuthComponent} from "./auth.component";
import {SharedModule} from "@feature/shared";
import {AuthRoutingModule} from "./auth-routing.module";
import {DirectivesModule} from "@directives";


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DirectivesModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
