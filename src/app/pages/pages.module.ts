import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from './components/data-render/data-render.components';
import { CategoryNavsComponent } from '../@swastika-io/components/category-navigations/category-navigations'
import { ModuleNavsComponent } from '../@swastika-io/components/module-navigations/module-navigations'
import { ModuleDetailsComponent } from '../@swastika-io/components/module-details/module-details'
import { ListModuleDetailsComponent } from '../@swastika-io/components/list-module-details/list-module-details'
import { CKEditorModule } from 'ng2-ckeditor';
import { AceEditorModule, AceEditorDirective } from 'ng2-ace-editor';
import { Ng2SmartTableModule } from 'ng2-smart-table';
// import "reflect-metadata";
const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    CKEditorModule,
    AceEditorModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    // ImageRenderComponent,
    // DatetimeRenderComponent, 
    // HtmlRenderComponent,
  
    // CategoryNavsComponent,
    // ModuleNavsComponent,
    // ModuleDetailsComponent,
    // ListModuleDetailsComponent,
  ],
  schemas: [
    ImageRenderComponent,
    DatetimeRenderComponent,
    HtmlRenderComponent,

    CategoryNavsComponent,
    ModuleNavsComponent,
    ModuleDetailsComponent,
    ListModuleDetailsComponent,
  ]
})
export class PagesModule {
}
