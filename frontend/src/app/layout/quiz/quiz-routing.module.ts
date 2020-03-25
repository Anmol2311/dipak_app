import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizQueComponent } from './quiz-que/quiz-que.component';

const routes: Routes = [
  {
    path:'',
    component:QuizQueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
