import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive, HostBinding,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from "@angular/core";


@Directive({
  selector: '[busy]'
})
export class BusyDirective implements OnInit {

  isBusy: boolean = false;

  private wrapperContainer: ComponentRef<BusyWrapperComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  @Input('busy') set busy(isBusy: boolean) {
    this.isBusy = isBusy;

    if (this.wrapperContainer?.instance) {
      this.wrapperContainer.instance.isBusy = isBusy;
    }
  }

  ngOnInit() {
    const containerFactory = this.componentFactoryResolver.resolveComponentFactory(BusyWrapperComponent);
    this.wrapperContainer = this.viewContainerRef.createComponent(containerFactory);
    this.wrapperContainer.instance.isBusy = this.isBusy;
    this.wrapperContainer.instance.template = this.templateRef;
  }
}

@Component({
  selector: 'busy-wrapper',
  template: `
    <div *ngIf="isBusy"
         class="busy-wrapper__spinner-wrap"
    >
      <mat-spinner class="busy-wrapper__spinner"
                   diameter="80"
                   strokeWidth="10"
      ></mat-spinner>
    </div>
    <ng-container *ngTemplateOutlet="template"></ng-container>
  `,
  styles: [`
    :host.busy-wrapper {
    }

    :host.busy-wrapper_busy {
      position: relative;
    }

    .busy-wrapper__spinner-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 2;
      background-color: rgba(255, 255, 255, 0.7);
    }

    .busy-wrapper__spinner {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `]
})
export class BusyWrapperComponent {
  @Input() isBusy: boolean = false;
  @Input() template: TemplateRef<any>;

  @HostBinding('class') get className(): string {
    return this.isBusy ? 'busy-wrapper busy-wrapper_busy' : 'busy-wrapper';
  }
}
