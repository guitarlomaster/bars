import {Injectable} from "@angular/core";
import {BehaviorSubject, forkJoin, map, Observable, of} from "rxjs";
import {IBreadcrumbItem} from "../models/breadcrumb.model";
import {ActivatedRoute} from "@angular/router";
import {BREADCRUMB_SERVICES, BREADCRUMBS_ROUTE_DATA} from "@constant";
import {VehiclesService} from "./vehicles.service";


@Injectable()
export class BreadcrumbService {

  readonly _items$ = new BehaviorSubject<IBreadcrumbItem[] | null>(null);
  private route: ActivatedRoute;

  get items$(): Observable<IBreadcrumbItem[] | null> {
    return this._items$;
  }

  constructor(private vehiclesService: VehiclesService) {}

  emitRoute(route: ActivatedRoute) {
    this.route = route;
    this.getBreadcrumbs(route.root)
      .pipe(map(this.getAdjustedBreadcrumbs))
      .subscribe((breadcrumbs) => {
        this._items$.next(breadcrumbs);
      })
  }

  // @ts-ignore
  getBreadcrumbs(route: ActivatedRoute, _url?: string, _breadcrumbs?: Observable<IBreadcrumbItem>[]): Observable<IBreadcrumbItem[]> {
    let url = _url ?? '';
    let breadcrumbs = _breadcrumbs ?? [];
    const routeURL = route.snapshot.url
      .map((segment) => segment.path)
      .join('/');

    if (routeURL) {
      url += `/${routeURL}`;
    }

    if (route.snapshot.data && route.snapshot.data[BREADCRUMBS_ROUTE_DATA.NAME]) {
      breadcrumbs.push(
        this.getSingleBreadcrumb(route.snapshot.data, url, routeURL)
      );
    }

    if (route.children && route.children.length) {
      for (let i = 0; i < route.children.length; i++) {
        return this.getBreadcrumbs(
          route.children[i], url, breadcrumbs
        );
      }
    } else {
      return forkJoin(breadcrumbs);
    }
  }

  getSingleBreadcrumb(data: any, url: string, routeUrl: string): Observable<IBreadcrumbItem> {
    switch (data[BREADCRUMBS_ROUTE_DATA.SERVICE]) {
      case BREADCRUMB_SERVICES.VEHICLE:
        return this.vehiclesService.getOne(routeUrl)
          .pipe(
            map((vehicle) => {
              return {
                name: `Edit: ${vehicle.name}`,
                uplink: data[BREADCRUMBS_ROUTE_DATA.UPLINK] ? url : '',
                disabled: data[BREADCRUMBS_ROUTE_DATA.DISABLED]
              }
            })
          );
      default:
        return of({
          name: data[BREADCRUMBS_ROUTE_DATA.NAME],
          uplink: data[BREADCRUMBS_ROUTE_DATA.UPLINK] ? url : '',
          disabled: data[BREADCRUMBS_ROUTE_DATA.DISABLED]
        })
    }
  }

  private getAdjustedBreadcrumbs(breadcrumbs: IBreadcrumbItem[]): IBreadcrumbItem[] | null {
    if (breadcrumbs.length && !breadcrumbs[breadcrumbs.length - 1].disabled) {
      return breadcrumbs.map((b) => ({...b, disabled: false}));
    } else {
      return null;
    }
  }

}
