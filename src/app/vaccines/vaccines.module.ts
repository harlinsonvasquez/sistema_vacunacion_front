import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VaccinesRoutingModule } from './vaccines-routing.module';
import { VaccineApplicationComponent } from './vaccine-application/vaccine-application.component';


@NgModule({
  declarations: [
    VaccineApplicationComponent
  ],
  imports: [
    CommonModule,
    VaccinesRoutingModule,
    FormsModule
  ]
})
export class VaccinesModule { }
