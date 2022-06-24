import {Component, HostBinding} from "@angular/core";

import {SideBarService} from "@services";


@Component({
  selector: 'side-bar-header',
  template: `
    <ng-content></ng-content>
    <mat-icon (click)="close()">close</mat-icon>
  `,
  styleUrls: ['./side-bar-header.component.scss']
})
export class SideBarHeaderComponent {

  @HostBinding('class.side-bar-header') private hostClassName = true;

  constructor(private sideBarService: SideBarService) {
  }

  close() {
    this.sideBarService.close();
  }

}
