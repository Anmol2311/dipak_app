import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultListComponent } from './result-list/result-list.component';

const routes: Routes = [
  
  {
    path:'',
    redirectTo:'result-list',
    pathMatch:'full'
  },
  {
    path:'result-list',
    component:ResultListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultRoutingModule { }
