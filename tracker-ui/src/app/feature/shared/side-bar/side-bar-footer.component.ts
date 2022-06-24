import {Component, HostBinding} from "@angular/core";


@Component({
  selector: 'side-bar-footer',
  template: `
    <ng-content></ng-content>
  `,
  styleUrls: ['./side-bar-footer.component.scss']
})
export class SideBarFooterComponent {

  @HostBinding('class.side-bar-footer') private hostClassName = true;
  @HostBinding('class.content-block') private contentClassName = true;

}
