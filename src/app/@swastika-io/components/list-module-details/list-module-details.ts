import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ModuleFullDetails, PagingData, DataType } from '../../../@swastika-io/viewmodels/article.viewmodels'
import { CKEditorComponent } from 'ng2-ckeditor';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../../../pages/components/data-render/data-render.components';
import { ServerDataSource } from '../../../pages/components/components.component';
import { ModuleDetailsService } from '../../../@swastika-io/components/module-details/module.details.service';
@Component({
    selector: 'sw-list-module-details',
    templateUrl: 'list-module-details.html',
    entryComponents: [
        ImageRenderComponent,
        HtmlRenderComponent,
        CKEditorComponent,
    ],
    providers: [
        ModuleDetailsService
    ]
})
export class ListModuleDetailsComponent implements OnInit {
    _modules: ModuleFullDetails[];
    title: string = "Modules";
    _articleId: string;
    pagingData = new PagingData();
    constructor(private http: Http
        , private moduleDetailsService: ModuleDetailsService
    ) {
        this.pagingData.pageIndex = 0;
        this.pagingData.pageSize = 15;
        this.pagingData.endPoint = 'http://localhost:54920/api/vi-vn/moduleData/'
    }
    @Output() onCheckedChange: EventEmitter<any> = new EventEmitter();
    @Input() modules: any;
    @Input() articleId: string;
    ngOnInit() {
        this._modules = this.modules;
        this._articleId = this.articleId;
    }
    onChange(event) {
        this.onCheckedChange.emit(event);
    }
    onCreate(module: ModuleFullDetails, articleId, data) {
        if (articleId != null) {

            var model: any = {};
            model.ArticleId = articleId;
            model.ModuleId = module.id;
            model.Specificulture = module.specificulture;
            model.Fields = module.fields;
            data.Model = model;
            data.Columns = module.columns;
            const postUrl = this.pagingData.endPoint + 'save'
            this.moduleDetailsService.saveModuleData(postUrl, data).then(
                result => {
                    if (result.isSucceed) {
                        var index = this._modules.findIndex(m => m.id == module.id);
                        this.moduleDetailsService.initModuleDetails(module[index]);
                    }
                }
            );

        } else {

        }
        console.log(module, articleId, JSON.stringify(data));
    }
    onEdit(module: ModuleFullDetails, event) {
        console.log(event);
        var index = this._modules.findIndex(m => m.id == module.id);
        if (index > -1) {
            this.moduleDetailsService.initModuleDetails(this._modules[index]);
        }
    }
}
