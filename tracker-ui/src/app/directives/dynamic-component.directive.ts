import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
  selector: '[dComponentHost]'
})
export class DynamicComponentDirective {

  constructor(public viewContainerRef: ViewContainerRef) {
  }

}

