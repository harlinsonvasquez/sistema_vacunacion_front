import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'children', loadChildren: () => import('./children/children.module').then(m => m.ChildrenModule) },
  { path: 'municipalities', loadChildren: () => import('./municipalities/municipalities.module').then(m => m.MunicipalitiesModule) },
  { path: 'departments', loadChildren: () => import('./departments/departments.module').then(m => m.DepartmentsModule) },
  { path: 'vaccines', loadChildren: () => import('./vaccines/vaccines.module').then(m => m.VaccinesModule) }, // Sin el "/apply" aquí
  { path: 'statistics', loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
