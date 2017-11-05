import { NgModule } from "@angular/core";
import { CategoryNavsComponent } from "app/@swastika-io/components/category-navigations/category-navigations";
import { ModuleNavsComponent } from "app/@swastika-io/components/module-navigations/module-navigations";
import { ModuleDetailsComponent } from "app/@swastika-io/components/module-details/module-details";
import { ListModuleDetailsComponent } from "app/@swastika-io/components/list-module-details/list-module-details";
import { ThemeModule } from "app/@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CKEditorModule } from "ng2-ckeditor";
import { AceEditorModule } from "ng2-ace-editor";
import { ToasterModule } from "angular2-toaster";
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from "app/pages/components/data-render/data-render.components";
import { SmartTableService } from "app/@core/data/smart-table.service";
import { NotificationService } from "app/pages/components/notifications/notifications.service";


@NgModule({
    imports: [
        ThemeModule,
        Ng2SmartTableModule,
        CKEditorModule,
        AceEditorModule,
        ToasterModule,
    ],
    declarations: [
        CategoryNavsComponent,
        ModuleNavsComponent,
        ModuleDetailsComponent,
        ListModuleDetailsComponent,

        ImageRenderComponent,
        DatetimeRenderComponent,
        HtmlRenderComponent,
    ],
    providers: [
        SmartTableService,
        NotificationService,
    ]
})
export class SWBackendModule { }
