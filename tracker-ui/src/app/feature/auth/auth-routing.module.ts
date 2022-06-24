import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {AuthComponent} from "./auth.component";
import {AUTH_TYPE_ROUTE_DATA, AUTH_TYPE_ROUTE_DATA_KEY} from "@constant";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent,
    data: {
      [AUTH_TYPE_ROUTE_DATA_KEY]: AUTH_TYPE_ROUTE_DATA.SIGN_IN
    }
  },
  {
    path: 'register',
    component: AuthComponent,
    data: {
      [AUTH_TYPE_ROUTE_DATA_KEY]: AUTH_TYPE_ROUTE_DATA.SIGN_UP
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
