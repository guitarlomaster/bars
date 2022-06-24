import {Component, OnChanges, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {catchError, delay, filter, Subject, takeUntil, throwError} from "rxjs";
import {keys} from "ramda";
import {MatDrawer} from "@angular/material/sidenav";

import {AuthService, BreadcrumbService, VehiclesService} from "@services";
import {SideBarService} from "@services";
import {DynamicComponentDirective} from "@directives";
import {ISideBar} from "@models";
import {ProfileComponent} from "@feature/shared";


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [VehiclesService, BreadcrumbService]
})
export class HeaderComponent implements OnInit, OnDestroy {

  breadcrumbs$ = this.breadcrumbService.items$;
  loading = false;

  @ViewChild(DynamicComponentDirective) drawerHost: DynamicComponentDirective;
  @ViewChild('drawer') drawer: MatDrawer;

  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(
    private vehiclesService: VehiclesService,
    private breadcrumbService: BreadcrumbService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private sideBarService: SideBarService
  ) {
  }

  ngOnInit() {
    this.vehiclesService.load();

    this.breadcrumbService.emitRoute(this.route);
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(() => {
        this.breadcrumbService.emitRoute(this.route);
      });

    this.sideBarService.sideBar$
      .pipe(
        filter(() => !!this.drawer),
        delay(0),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((sideBar) => {
        this.handleSideBar(sideBar);
      });
  }

  handleSideBar(sideBar: ISideBar) {
    const viewContainerRef = this.drawerHost.viewContainerRef;
    viewContainerRef.clear();

    if (sideBar.component) {
      const componentRef = viewContainerRef.createComponent(sideBar.component);

      if (sideBar.data) {
        keys(sideBar.data).forEach((key) => {
          componentRef[key] = sideBar.data[key];
        })
      }

      this.drawer.open();
    } else {
      this.drawer.close();
    }
  }

  openProfileSideBar() {
    this.sideBarService.open(ProfileComponent);
  }

  logout() {
    this.loading = true;

    this.authService.logout()
      .pipe(
        catchError((err) => {
          this.loading = false;
          return throwError(err);
        })
      )
      .subscribe(() => {
        this.router.navigate(['auth']);
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
