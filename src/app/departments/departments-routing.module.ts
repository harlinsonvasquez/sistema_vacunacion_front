import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentManagementComponent } from './department-management/department-management.component';

const routes: Routes = [
  { path: '', component: DepartmentManagementComponent }  // Ruta para la gestión de departamentos
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
