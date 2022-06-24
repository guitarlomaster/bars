import {Component, Inject, Input, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'confirm-generic',
  template: `
    <div class="confirm-generic">
      <h2 class="mb-16px">{{ title }}</h2>
      <p class="mb-16px">{{ message }}</p>
      <div class="confirm-generic__actions pt-16px">
        <button mat-raised-button
                (click)="matDialogRef.close()"
                class="mr-16px"
        >Cancel</button>
        <button mat-raised-button
                color="primary"
                (click)="confirm()"
        >Confirm</button>
      </div>
    </div>
  `,
  styles: [`
    .confirm-generic__actions {
      display: flex;
      justify-content: flex-end;
    }
  `]
})
export class ConfirmGenericComponent implements OnInit {

  @Input() title = '';
  @Input() message = '';
  @Input() onConfirm: () => void = () => {};

  constructor(
    public matDialogRef: MatDialogRef<ConfirmGenericComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.title = this.data.title;
    this.message = this.data.message;
    this.onConfirm = this.data.onConfirm;
  }

  confirm() {
    this.onConfirm();
    this.matDialogRef.close();
  }
}
