import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ModuleFullDetails, PagingData, DataType } from '../../../@swastika-io/viewmodels/article.viewmodels'
import { CKEditorComponent } from 'ng2-ckeditor';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../../../pages/components/data-render/data-render.components';
import { ServerDataSource } from '../../../pages/components/components.component';
@Component({
    selector: 'sw-list-module-details',
    templateUrl: 'list-module-details.html',
    entryComponents: [
        ImageRenderComponent,
        HtmlRenderComponent,
        CKEditorComponent,
    ]
})
export class ListModuleDetailsComponent implements OnInit {
    _modules: ModuleFullDetails[];
    title: string = "Modules";
    _articleId: string;
    pagingData = new PagingData();
    constructor(private http: Http) {
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
    onCreate(moduleId, articleId, data) {
        console.log(moduleId, articleId, data);
    }
}
