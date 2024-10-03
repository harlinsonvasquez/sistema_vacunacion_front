import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChildrenManagementComponent } from './children-management/children-management.component';
import { VaccinationByMunicipalityComponent } from '../vaccination-by-municipality/vaccination-by-municipality.component';

const routes: Routes = [
  { path: '', component: ChildrenManagementComponent },
  { path: 'vaccination-by-municipality', component: VaccinationByMunicipalityComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChildrenRoutingModule { }
