import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamFormComponent } from './exam-form/exam-form.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ExamFormComponent, ExamListComponent],
  imports: [
    CommonModule,
    ExamRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ExamListComponent,ExamFormComponent],
  entryComponents: [ExamFormComponent,ConfirmDialogComponent]
})
export class ExamModule {
  constructor(){
    // console.log('Exam Module');
  }
 }
