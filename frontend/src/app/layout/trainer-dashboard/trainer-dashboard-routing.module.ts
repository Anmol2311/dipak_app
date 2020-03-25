import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainerDashboardComponent } from './trainer-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:TrainerDashboardComponent,
    children:[
      {
        path:'',
        redirectTo:'student',
        pathMatch:'full'
      },
      {
        path: 'student',
        loadChildren: "./../student/student.module#StudentModule"
      },
      {
        path: 'exam',
        loadChildren: "./../exam/exam.module#ExamModule"
      },
      {
        path: 'question',
        loadChildren: "./../question/question.module#QuestionModule"
      },
      {
        path: 'voucher',
        loadChildren: "./../voucher/voucher.module#VoucherModule"
      },
      {
        path: 'result',
        loadChildren: "./../result/result.module#ResultModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerDashboardRoutingModule { }
