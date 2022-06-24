import {Component, EventEmitter, Input, Output} from "@angular/core";


@Component({
  selector: 'bulk-actions',
  templateUrl: './bulk-actions.component.html',
  styleUrls: ['./bulk-actions.component.scss']
})
export class BulkActionsComponent {
  @Input() isDeleteActive: boolean = false;
  @Input() isShown: boolean = false;

  @Output() onDelete: EventEmitter<void> = new EventEmitter<void>();
}
