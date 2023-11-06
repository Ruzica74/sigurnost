import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JedanComponent } from './jedan/jedan.component';

const routes: Routes = [{
  path:'',
  component:JedanComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
