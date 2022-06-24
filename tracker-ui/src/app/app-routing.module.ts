import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AuthGuard} from "@guards";
import {DefaultRedirectGuard} from "./guards/default-redirect.guard";


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@feature/auth').then((m) => m.AuthModule),
    resolve: [DefaultRedirectGuard]
  },
  {
    path: 'content',
    loadChildren: () => import('@feature/content').then((m) => m.ContentModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
