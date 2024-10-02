import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MunicipalityManagementComponent } from './municipality-management/municipality-management.component';

const routes: Routes = [
  { path: '', component: MunicipalityManagementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MunicipalitiesRoutingModule { }
