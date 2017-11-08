import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModuleComponent } from './module.component';
import { ListModuleComponent } from './list-module/list-module.component';
import { CreateModuleComponent } from './create-module/create-module.component';


const routes: Routes = [{
  path: '',
  component: ModuleComponent,
  children: [
    {
      path: 'list-module',
      component: ListModuleComponent,
    },
    {
      path: 'create-module',
      component: CreateModuleComponent,
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
  CreateModuleComponent,
];
