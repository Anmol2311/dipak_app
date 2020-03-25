import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainerDashboardRoutingModule } from './trainer-dashboard-routing.module';
import { TrainerDashboardComponent } from './trainer-dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [TrainerDashboardComponent],
  imports: [
    CommonModule,
    TrainerDashboardRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[ConfirmDialogComponent]
})
export class TrainerDashboardModule { }
