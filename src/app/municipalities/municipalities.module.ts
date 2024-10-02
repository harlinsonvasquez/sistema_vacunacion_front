import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MunicipalitiesRoutingModule } from './municipalities-routing.module';
import { MunicipalityManagementComponent } from './municipality-management/municipality-management.component';


@NgModule({
  declarations: [
    MunicipalityManagementComponent
  ],
  imports: [
    CommonModule,
    MunicipalitiesRoutingModule,
    FormsModule
  ]
})
export class MunicipalitiesModule { }
