import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ModuleFullDetails, PagingData } from '../../../@swastika-io/viewmodels/article.viewmodels'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ImageRenderComponent, DatetimeRenderComponent } from '../../../pages/components/data-render/data-render.components';
import { ServerDataSource } from '../../../pages/components/components.component';
@Component({
    selector: 'sw-module-details',
    templateUrl: 'module-details.html',
})
export class ModuleDetailsComponent implements OnInit {
    _module: ModuleFullDetails;
    title: string = "Modules";
    pagingData = new PagingData();
    constructor(private http: Http) {
        this.pagingData.pageIndex = 0;
        this.pagingData.pageSize = 15;
        this.pagingData.endPoint = 'http://localhost:54920/api/vi-vn/moduleData'
    }
    @Output() onCheckedChange: EventEmitter<any> = new EventEmitter();
    @Input() module: any;
    ngOnInit() {
        this._module = this.module;
        this._module.columns.forEach(col => {
            this.settings.columns[col.name] = {};
            this.settings.columns[col.name]['title'] = col.name;
            this.settings.columns[col.name]['type'] = col.dataType;
            this.settings.columns[col.name]['filter'] = false
        });
        this.source = new ServerDataSource(this.http,
            {
                endPoint: this.pagingData.endPoint,
                dataKey: 'data.items',
                pagerLimitKey: 'data.pageSize',
                pagerPageKey: 'data.pageIndex',
                totalKey: 'data.totalItems',
            },
        );
    }
    onChange(event) {
        this.onCheckedChange.emit(event);
    }
    source: ServerDataSource;
    settings = {
        mode: 'external',
        columns: {},
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
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
}
