import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { StudentLoginComponent } from './student-login/student-login.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentModule } from '../student/student.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [StudentLoginComponent, AdminLoginComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StudentModule,
    MaterialModule
  ],
  exports: [StudentLoginComponent, AdminLoginComponent,PageNotFoundComponent],
})
export class IndexModule { }
