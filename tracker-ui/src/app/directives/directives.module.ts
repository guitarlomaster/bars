import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

import {BusyDirective, BusyWrapperComponent} from "./busy.directive";
import {DynamicComponentDirective} from "./dynamic-component.directive";


@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    BusyDirective,
    BusyWrapperComponent,
    DynamicComponentDirective
  ],
  exports: [
    BusyDirective,
    DynamicComponentDirective
  ],
  entryComponents: [
    BusyWrapperComponent
  ]
})
export class DirectivesModule {

}
