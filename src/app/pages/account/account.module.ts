import { NgModule } from "@angular/core";
import { routedComponents, AccountRoutingModule } from './account-routing.module'
import { AccountService } from "app/pages/account/account.services";
import { ThemeModule } from "app/@theme/theme.module";
@NgModule({
    imports:[
        ThemeModule,
        AccountRoutingModule  
    ],
    declarations:[
        ...routedComponents, 
    ],
    exports:[

    ],
    providers:[
        AccountService
    ]
})
export class AccountModule{

}