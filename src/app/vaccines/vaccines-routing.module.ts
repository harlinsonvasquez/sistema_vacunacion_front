import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VaccineApplicationComponent } from './vaccine-application/vaccine-application.component';

const routes: Routes = [
  { path: 'apply', component: VaccineApplicationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaccinesRoutingModule { }
