import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DepartmentManagementComponent } from './department-management/department-management.component';


@NgModule({
  declarations: [
    DepartmentManagementComponent
  ],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    FormsModule
  ]
})
export class DepartmentsModule { }
