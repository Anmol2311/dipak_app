import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ConfirmDialogComponent } from 'src/app/shared/material/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [QuestionListComponent, QuestionFormComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [QuestionListComponent, QuestionFormComponent],
  entryComponents:[QuestionFormComponent,ConfirmDialogComponent]
})
export class QuestionModule {
  constructor(){
    // console.log('Question Module');
  }
 }
