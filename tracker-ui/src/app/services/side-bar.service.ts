import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {ISideBar} from "@models";


@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  private readonly initialData = {
    component: null,
    data: null
  };

  readonly sideBar$ = new BehaviorSubject<ISideBar>(this.initialData);

  constructor() {
  }

  open(component: any, data: any = null) {
    this.sideBar$.next({component, data});
  }

  close() {
    this.sideBar$.next(this.initialData);
  }

}
