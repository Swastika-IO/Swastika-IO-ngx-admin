import { Component, Input, Output, OnInit, OnChanges, EventEmitter, Injectable } from '@angular/core';
import { ModuleFullDetails, PagingData, DataType } from '../../../@swastika-io/viewmodels/article.viewmodels'
import { CKEditorComponent } from 'ng2-ckeditor';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../../../pages/components/data-render/data-render.components';
import { ServerDataSource } from '../../../pages/components/components.component';
@Injectable()
export class ModuleDetailsService {
    pagingData = new PagingData();
    constructor(private http: Http) {
        this.pagingData.pageIndex = 0;
        this.pagingData.pageSize = 15;

    }
    initModuleDetails(module: ModuleFullDetails, articleId: string = ''): void {
        this.pagingData.endPoint = 'http://localhost:54920/api/vi-vn/moduleData/';
        if (articleId != '') {
            this.pagingData.endPoint += 'getByArticle/' + articleId + '/';
        }
        module.settings = {
            mode: 'inline',
            columns: {},
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },

            actions: {
                add: true,
            },
        };
        module.columns.forEach(col => {
            module.settings.columns[col.name] = {};
            module.settings.columns[col.name]['title'] = col.name;
            switch (col.dataType) {
                case DataType.Image:
                    module.settings.columns[col.name]['type'] = 'custom';
                    module.settings.columns[col.name]['renderComponent'] = ImageRenderComponent;
                    break;
                case DataType.Html:
                    module.settings.columns[col.name]['type'] = 'custom';
                    module.settings.columns[col.name]['renderComponent'] = HtmlRenderComponent;
                    module.settings.columns[col.name]['editor'] = {
                        type: 'custom',
                        component: CKEditorComponent,
                    };
                    break;
                default:
                    module.settings.columns[col.name]['type'] = 'text';
                    break;
            }
            module.settings.columns[col.name]['filter'] = false;
        });

        module.source = new ServerDataSource(this.http,
            {
                endPoint: this.pagingData.endPoint + module.id,
                dataKey: 'data.jsonItems',
                pagerLimitKey: 'data.pageSize',
                pagerPageKey: 'data.pageIndex',
                totalKey: 'data.totalItems',
            },
        );
    }

}