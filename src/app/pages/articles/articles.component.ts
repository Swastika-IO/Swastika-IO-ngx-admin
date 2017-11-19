import { Component } from '@angular/core';
// import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../components/data-render/data-render.components';
// import { CategoryNavsComponent } from '../../@swastika-io/components/category-navigations/category-navigations'
// import { ModuleNavsComponent } from '../../@swastika-io/components/module-navigations/module-navigations'
// import { ModuleDetailsComponent } from '../../@swastika-io/components/module-details/module-details'
// import { ListModuleDetailsComponent } from '../../@swastika-io/components/list-module-details/list-module-details'

@Component({
  selector: 'ngx-articles',
  template: `<router-outlet></router-outlet>`,
  entryComponents: [
    // ImageRenderComponent,
    // DatetimeRenderComponent,
    // HtmlRenderComponent,    
    // CategoryNavsComponent,
    // ModuleNavsComponent,
    // ModuleDetailsComponent,
    // ListModuleDetailsComponent,
  ]


})
export class ArticlesComponent {
}
