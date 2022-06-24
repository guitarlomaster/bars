import {Component, OnDestroy, OnInit} from "@angular/core";
import {Subject, takeUntil} from "rxjs";

import {BreadcrumbService} from "@services";
import {IBreadcrumbItem} from "../../../models/breadcrumb.model";


@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit, OnDestroy {

  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(private breadcrumbService: BreadcrumbService) {
  }

  breadcrumbs: IBreadcrumbItem[] = [];

  ngOnInit() {
    this.breadcrumbService.items$
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((breadcrumbs) => {
        this.breadcrumbs = breadcrumbs ?? [];
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }

}
