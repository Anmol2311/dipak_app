import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentAuthGuard } from './shared/authentication/student-auth.guard';
import { UserAuthGuard } from './shared/authentication/user-auth.guard';
import { PageNotFoundComponent } from './layout/index/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    loadChildren: "./layout/index/index.module#IndexModule",
  },
  {
    path: 'admin-dashboard',
    loadChildren: "./layout/admin-dashboard/admin-dashboard.module#AdminDashboardModule",
    canActivate: [UserAuthGuard]
  },
  {
    path: 'trainer-dashboard',
    loadChildren: "./layout/trainer-dashboard/trainer-dashboard.module#TrainerDashboardModule",
    canActivate: [UserAuthGuard]
  },
  {
    path: 'quiz',
    loadChildren: "./layout/quiz/quiz.module#QuizModule",
    canActivate: [StudentAuthGuard]
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
