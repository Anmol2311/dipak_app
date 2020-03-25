import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultRoutingModule } from './result-routing.module';
import { ResultListComponent } from './result-list/result-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ResultListComponent],
  imports: [
    CommonModule,
    ResultRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ResultListComponent],
  entryComponents:[ConfirmDialogComponent]
})
export class ResultModule {
  constructor() {
    // console.log('Result Module');
  }
}
