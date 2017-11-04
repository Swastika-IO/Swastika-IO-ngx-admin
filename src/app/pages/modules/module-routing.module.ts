import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleComponent } from './module.component';
import { ListModuleComponent } from './list-module/list-module.component';


const routes: Routes = [{
  path: '',
  component: ModuleComponent,
  children: [
    {
      path: 'list-module',
      component: ListModuleComponent,
    }
    // ,{
    //   path: 'manage-module',
    //   component: ManageModuleComponent,
    // }
    // ,{
    //   path: 'manage-module/:id',
    //   component: ManageModuleComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModuleRoutingModule { }

export const routedComponents = [
  ModuleComponent,
  ListModuleComponent,
];
