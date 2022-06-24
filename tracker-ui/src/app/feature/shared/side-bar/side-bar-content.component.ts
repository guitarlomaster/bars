import {Component, HostBinding} from "@angular/core";


@Component({
  selector: 'side-bar-content',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host.side-bar-content {
      padding: 16px;
      display: block;
      flex: 1;
    }
  `]
})
export class SideBarContentComponent {

  @HostBinding('class.side-bar-content') private hostClassName = true;
  @HostBinding('class.content-block') private contentClassName = true;

}
