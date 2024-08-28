import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilizatorComponent } from './utilizator/utilizator.component';
import { AdminComponent } from './admin/admin.component';
const routes: Routes = [
  {
    path: 'utilizator',
    component: UtilizatorComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
