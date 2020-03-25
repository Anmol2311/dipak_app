import { NgModule } from '@angular/core';
import * as Material from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { IconSnackBarComponent } from './icon-snack-bar/icon-snack-bar.component';

const MaterialComponent = [
  Material.MatToolbarModule,
  Material.MatTableModule,
  Material.MatPaginatorModule,
  Material.MatFormFieldModule,
  Material.MatIconModule,
  Material.MatInputModule,
  Material.MatSelectModule,
  Material.MatOptionModule,
  Material.MatRadioModule,
  Material.MatButtonModule,
  Material.MatDialogModule,
  Material.MatSnackBarModule,
  Material.MatSlideToggleModule,
  Material.MatExpansionModule,
  Material.MatDatepickerModule,
  Material.MatNativeDateModule,
  Material.MatGridListModule,
  Material.MatCardModule,
  Material.MatSidenavModule,
  Material.MatListModule,
  Material.MatCardModule,
  Material.MatProgressBarModule,
  Material.MatStepperModule,
  Material.MatTooltipModule
];

@NgModule({
  imports: [MaterialComponent],
  exports: [MaterialComponent],
  declarations: [ConfirmDialogComponent, IconSnackBarComponent],
  entryComponents:[ConfirmDialogComponent,IconSnackBarComponent]
})
export class MaterialModule { }
