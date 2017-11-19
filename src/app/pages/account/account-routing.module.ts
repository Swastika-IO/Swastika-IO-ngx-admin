import { Routes, RouterModule } from "@angular/router";
import { AccountComponent } from "app/pages/account/account.component";
import { LoginComponent } from "app/pages/account/login/login.component";
import { NgModule } from "@angular/core";

const routes: Routes =[{
    path: '',
    component: AccountComponent,
    children: [{
        path:'login',
        component: LoginComponent
    }]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class AccountRoutingModule { }
  
  export const routedComponents = [
    AccountComponent,
    LoginComponent
  ];
  