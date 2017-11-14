import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ModuleFullDetails, PagingData, DataType, SWDataTable } from '../../../@swastika-io/viewmodels/article.viewmodels'
import { CKEditorComponent } from 'ng2-ckeditor';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../../../pages/components/data-render/data-render.components';
import { ServerDataSource } from '../../../pages/components/components.component';
import { ModuleDetailsService } from '../../../@swastika-io/components/module-details/module.details.service';
import { environment } from '../../../../environments/environment';
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
    _modules: SWDataTable[];
    title: string = "Modules";
    _articleId: string;
    pagingData = new PagingData();
    apiUrl = environment.apiUrl;
    constructor(private http: Http
        , private moduleDetailsService: ModuleDetailsService
    ) {
        this.pagingData.pageIndex = 0;
        this.pagingData.pageSize = 15;
        this.pagingData.endPoint = this.apiUrl + '/api/vi-vn/moduleData/'
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
    onCreate(vmModule: SWDataTable, articleId, data) {
        var module = vmModule.models;
        var model: any = {};
        model.articleId = articleId;
        model.moduleId = module.id;
        model.specificulture = module.specificulture;
        model.fields = module.fields;
        data.model = model;
        data.columns = module.columns;
        const postUrl = this.pagingData.endPoint + 'save'

        vmModule.source.prepend(data);
        vmModule.source.refresh();
        // if (articleId != null) {

        //     // var model: any = {};
        //     // model.articleId = articleId;
        //     // model.moduleId = module.id;
        //     // model.specificulture = module.specificulture;
        //     // model.fields = module.fields;
        //     // data.model = model;
        //     // data.columns = module.columns;
        //     // const postUrl = this.pagingData.endPoint + 'save'

        //     // this.moduleDetailsService.saveModuleData(postUrl, data).then(
        //     //     result => {
        //     //         if (result.isSucceed) {
        //     //             var index = this._modules.findIndex(m => m.models.id == module.id);
        //     //             this.moduleDetailsService.initModuleDetails(module[index]);
        //     //         }
        //     //     }
        //     // );

        // } else {

        // }
    }
    // onEdit(module: ModuleFullDetails, event) {
    //     var index = this._modules.findIndex(m => m.models.id == module.id);
    //     if (index > -1) {
    //         this._modules[index] = this.moduleDetailsService.initModuleDetails(this._modules[index].models);
    //     }
    // }
    onDeleteDataConfirm(vmModule: SWDataTable, articleId, event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            // this.deleteModuleData(event);
            if (event.data.id != '') {
                this.deleteModuleData(vmModule, event);
            } else {
                vmModule.source.remove(event.data);
                vmModule.source.refresh();
            }
            // console.log(vmModule);
        }
    };

    deleteModuleData(vmModule: SWDataTable, event): void {
        // console.log(event);
        this.moduleDetailsService.deleteModuleDataWithPromise(environment.culture, event.data.id)
            .then(result => {
                if (result.isSucceed) {
                    vmModule.source.remove(event.data);
                    vmModule.source.refresh();
                } else {
                    this.showErrors(result.errors, result.ex);
                }
            },
            error => { });
    }
    showErrors(errors: string[], ex: any) {
    };
}
