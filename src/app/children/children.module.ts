import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { ChildrenRoutingModule } from './children-routing.module';
import { ChildrenManagementComponent } from './children-management/children-management.component';


@NgModule({
  declarations: [
    ChildrenManagementComponent
  ],
  imports: [
    CommonModule,
    ChildrenRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChildrenModule { }
