import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:AdminDashboardComponent,
    children:[
      {
        path:'',
        redirectTo:'user',
        pathMatch:'full'
      },
      {
        path: 'user',
        loadChildren: "./../user/user.module#UserModule"
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
export class AdminDashboardRoutingModule { }
