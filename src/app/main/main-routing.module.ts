import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilizatorComponent } from './utilizator/utilizator.component';
import { AdminComponent } from './admin/admin.component';
import { authorizeGuard, authorizeUserGuard } from '../../_core/guards/authorize.guard';

const routes: Routes = [
  {
    path: 'utilizator',
    component: UtilizatorComponent,
    canActivate: [authorizeUserGuard]

  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authorizeGuard],

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
