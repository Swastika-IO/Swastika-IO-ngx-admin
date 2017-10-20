import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ArticlesRoutingModule, routedComponents } from './articles-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
import { ArticleService } from './article.services';
import { ImageRenderComponent, DatetimeRenderComponent } from '../components/data-render/data-render.components';
import { CKEditorModule } from 'ng2-ckeditor';


@NgModule({
  imports: [
    ThemeModule,
    ArticlesRoutingModule,
    Ng2SmartTableModule,  
    CKEditorModule,  
  ],
  declarations: [
    ...routedComponents,
    ImageRenderComponent,
    DatetimeRenderComponent,
  ],
  providers: [
    SmartTableService,
    ArticleService,
  ],
})
export class ArticlesModule { }
