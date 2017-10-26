import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2FileInputModule } from 'ng2-file-input';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { ArticlesRoutingModule, routedComponents } from './articles-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ArticleService } from './article.services';
import { ModuleService } from '../modules/modules.service';
import { ModuleDetailsService } from '../../@swastika-io/components/module-details/module.details.service';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../components/data-render/data-render.components';
import { CKEditorModule } from 'ng2-ckeditor';
import { AceEditorModule, AceEditorDirective } from 'ng2-ace-editor';
import { NotificationService } from '../components/notifications/notifications.service'
import { Ng2FileInputService, } from 'ng2-file-input'

import { CategoryNavsComponent } from '../../@swastika-io/components/category-navigations/category-navigations'
import { ModuleNavsComponent } from '../../@swastika-io/components/module-navigations/module-navigations'
import { ModuleDetailsComponent } from '../../@swastika-io/components/module-details/module-details'
import { ListModuleDetailsComponent } from '../../@swastika-io/components/list-module-details/list-module-details'
@NgModule({
  imports: [
    ThemeModule,
    ArticlesRoutingModule,
    Ng2SmartTableModule,
    CKEditorModule,
    AceEditorModule,
    ToasterModule,
    Ng2FileInputModule
  ],
  declarations: [
    ...routedComponents,
    ImageRenderComponent,
    DatetimeRenderComponent,
    HtmlRenderComponent,
    CategoryNavsComponent,
    ModuleNavsComponent,
    ModuleDetailsComponent,
    ListModuleDetailsComponent,
  ],
  providers: [
    SmartTableService,
    ArticleService,
    NotificationService,
    Ng2FileInputService,
    ModuleService,
    ModuleDetailsService
  ],
})
export class ArticlesModule { }
