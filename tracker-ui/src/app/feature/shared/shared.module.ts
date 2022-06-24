import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSortModule} from "@angular/material/sort";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTooltipModule} from "@angular/material/tooltip";

import {BulkActionsComponent} from "./bulk-actions/bulk-actions.component";
import {ProfileComponent} from "./side-bar/profile/profile.component";
import {SideBarHeaderComponent} from "./side-bar/side-bar-header.component";
import {SideBarContentComponent} from "./side-bar/side-bar-content.component";
import {SideBarFooterComponent} from "./side-bar/side-bar-footer.component";
import {ConfirmGenericComponent} from "./dialog/confirm-generic/confirm-generic.component";


const matModules = [
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatTableModule,
  MatCheckboxModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatSidenavModule,
  MatDialogModule,
  MatSnackBarModule,
  MatTooltipModule
];

@NgModule({
  declarations: [
    BulkActionsComponent,
    ProfileComponent,
    SideBarHeaderComponent,
    SideBarContentComponent,
    SideBarFooterComponent,
    ConfirmGenericComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ...matModules
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    ...matModules,
    BulkActionsComponent,
    ProfileComponent,
    SideBarHeaderComponent,
    SideBarContentComponent,
    SideBarFooterComponent,
    ConfirmGenericComponent
  ]
})
export class SharedModule { }
