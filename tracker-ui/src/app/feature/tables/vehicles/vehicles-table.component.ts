import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatMenuTrigger} from "@angular/material/menu";
import {Subject} from "rxjs";
import {equals} from "ramda";
import {MatSort, Sort} from "@angular/material/sort";
import {Router} from "@angular/router";

import {IVehicle} from "@models";
import {VEHICLE_TABLE_ACTION_TYPES, VEHICLE_TABLE_COLUMNS} from "@constant";


@Component({
  selector: 'vehicles-table',
  templateUrl: './vehicles-table.component.html',
  styleUrls: ['./vehicles-table.component.scss']
})
export class VehiclesTableComponent implements OnChanges {

  @Input() searchString: string = '';
  @Input() data: IVehicle[] = [];
  @Input() selectedDataIds: string[] = [];
  @Input() loadingDataIds: string[] = [];

  @Output() onDataSelected: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() onDataLoading: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() onDelete: EventEmitter<string[]> = new EventEmitter<string[]>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('actionsMenuTrigger') actionsMenuTrigger: MatMenuTrigger;

  tableRowSequence = [
    VEHICLE_TABLE_COLUMNS.SELECT,
    VEHICLE_TABLE_COLUMNS.NAME,
    VEHICLE_TABLE_COLUMNS.DESCRIPTION,
    VEHICLE_TABLE_COLUMNS.ACTION
  ];
  tableDataSource = new MatTableDataSource<IVehicle>([]);
  tableSelection = new SelectionModel<string>(true, []);
  tableSorting: Sort = {
    active: VEHICLE_TABLE_COLUMNS.NAME,
    direction: 'desc'
  };

  rowInAction: IVehicle | null = null;
  pendingAction: VEHICLE_TABLE_ACTION_TYPES | null = null;

  COLUMNS = VEHICLE_TABLE_COLUMNS;
  ACTION_TYPES = VEHICLE_TABLE_ACTION_TYPES;

  get isAllSelected(): boolean {
    return this.selectedDataIds.length === this.tableDataSource.data.length;
  }

  get isFilteredDataEmpty(): boolean {
    return this.tableDataSource.filteredData.length === 0;
  }

  private readonly ngUnsubscribe$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && !equals(changes.data.currentValue, changes.data.previousValue)) {
      setTimeout(() => {
        this.tableDataSource.data = this.data;
        this.tableDataSource.sort = this.sort;
      });
    }

    if (changes.searchString && changes.searchString.currentValue !== changes.searchString.previousValue) {
      this.tableDataSource.filter = this.searchString;
    }

    if (changes.selectedDataIds && (changes.selectedDataIds.currentValue?.length ?? 0) !== (changes.selectedDataIds.previousValue?.length ?? 0)) {
      this.tableSelection.clear();

      this.selectedDataIds.forEach((id) => {
        this.tableSelection.select(id);
      });
    }
  }

  isRowInLoading(id: string): boolean {
    return this.loadingDataIds.includes(id);
  }

  trackBy(idx: number, item: IVehicle) {
    return item.id;
  }

  masterToggle() {
    if (this.isAllSelected) {
      this.onDataSelected.emit([]);
      return;
    }

    const allSelectedIds = this.tableDataSource.data.map((vehicle) => vehicle.id);
    this.onDataSelected.emit(allSelectedIds);
  }

  singleToggle(id: string) {
    if (this.tableSelection.isSelected(id)) {
      this.onDataSelected.emit(this.selectedDataIds.filter(item => item !== id));
    } else {
      this.onDataSelected.emit([...this.selectedDataIds, id]);
    }
  }

  onActionClicked(vehicle: IVehicle) {
    this.rowInAction = vehicle;
  }

  setPendingAction(event: MouseEvent, action: VEHICLE_TABLE_ACTION_TYPES) {
    event.stopPropagation();

    this.pendingAction = action;
  }

  confirmPendingAction(event: MouseEvent) {
    event.stopPropagation();

    this.confirmAction(this.pendingAction as VEHICLE_TABLE_ACTION_TYPES);
    this.actionsMenuTrigger.closeMenu();
  }

  cancelPendingAction(event: MouseEvent) {
    event.stopPropagation();

    this.pendingAction = null;
  }

  confirmAction(action: VEHICLE_TABLE_ACTION_TYPES) {
    if (this.rowInAction) {
      switch (action) {
        case VEHICLE_TABLE_ACTION_TYPES.EDIT:
          this.router.navigate(['content', 'vehicles', this.rowInAction.id]);
          break
        case VEHICLE_TABLE_ACTION_TYPES.DELETE:
          this.onDelete.emit([this.rowInAction.id]);
          break;
      }
    }
  }

  clearActionState() {
    this.rowInAction = null;
    this.pendingAction = null;
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
