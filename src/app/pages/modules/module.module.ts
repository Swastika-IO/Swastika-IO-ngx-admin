import { NgModule } from '@angular/core';

import { Ng2FileInputModule } from 'ng2-file-input';
import { ThemeModule } from '../../@theme/theme.module';
import { ToasterModule } from 'angular2-toaster';
import { ModuleRoutingModule, routedComponents } from './module-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ModuleService } from '../modules/module.service';
import { ModuleDetailsService } from '../../@swastika-io/components/module-details/module.details.service';

import { SWBackendModule } from 'app/@swastika-io/components/sw-backend.module';

import { NotificationService } from '../components/notifications/notifications.service'
import { Ng2FileInputService, } from 'ng2-file-input'
import { PagesModule } from '../pages.module'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ng2-ckeditor';
import { AceEditorModule } from 'ng2-ace-editor';
@NgModule({
  imports: [
    ThemeModule,
    ToasterModule,
    Ng2FileInputModule,
    Ng2SmartTableModule,
    CKEditorModule,
    AceEditorModule,
    ToasterModule,
    SWBackendModule,

    ModuleRoutingModule,
  ],
  declarations: [
    ...routedComponents,

  ],
  providers: [
    SmartTableService,
    NotificationService,
    Ng2FileInputService,
    ModuleService,
    ModuleDetailsService
  ],
})
export class ModuleModule { }
