import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ModuleFullDetails, PagingData, DataType } from '../../../@swastika-io/viewmodels/article.viewmodels'
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../../../pages/components/data-render/data-render.components';
import { ServerDataSource } from '../../../pages/components/components.component';
import { ModuleDetailsService } from './module.details.service';
import { environment } from '../../../../environments/environment';
@Component({
    selector: 'sw-module-details',
    templateUrl: 'module-details.html',
    entryComponents: [
        ImageRenderComponent,
        HtmlRenderComponent,
    ]
})
export class ModuleDetailsComponent implements OnInit {
    _module: ModuleFullDetails;
    title: string = "Modules";
    pagingData = new PagingData();
    apiUrl = environment.apiUrl;

    constructor(private http: Http
        , private moduleDetailsService: ModuleDetailsService
    ) {
        this.pagingData.pageIndex = 0;
        this.pagingData.pageSize = 15;
        this.pagingData.endPoint = this.apiUrl + 'api/vi-vn/moduleData/'
    }
    @Output() onCheckedChange: EventEmitter<any> = new EventEmitter();
    @Input() module: any;
    ngOnInit() {
        this._module = this.module;
        this._module.columns.forEach(col => {
            this.settings.columns[col.name] = {};
            this.settings.columns[col.name]['title'] = col.name;
            switch (col.dataType) {
                case DataType.Image:
                    this.settings.columns[col.name]['type'] = 'custom';
                    this.settings.columns[col.name]['renderComponent'] = ImageRenderComponent;
                    break;
                case DataType.Html:
                    this.settings.columns[col.name]['type'] = 'custom';
                    this.settings.columns[col.name]['renderComponent'] = HtmlRenderComponent;
                    break;
                default:
                    this.settings.columns[col.name]['type'] = 'text';
                    break;
            }
            this.settings.columns[col.name]['filter'] = false;
        });
        this.source = new ServerDataSource(this.http,
            {
                endPoint: this.pagingData.endPoint + this._module.id,
                dataKey: 'data.jsonItems',
                pagerLimitKey: 'data.pageSize',
                pagerPageKey: 'data.pageIndex',
                totalKey: 'data.totalItems',
            },
        );
    }
    onChange(event) {
        this.onCheckedChange.emit(event);
    }
    onCreate(event) {
        
    }
    onEdit(event) {
        
    }
    source: ServerDataSource;
    settings = {
        mode: 'inline',
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
    onDeleteDataConfirm(event): void {
        if (window.confirm('Are you sure you want to delete?')) {
            this.deleteModuleData(event);
        }
    };

    deleteModuleData(event): void {
        this.moduleDetailsService.deleteModuleDataWithPromise('vi-vn', event.data.id)
            .then(result => {
                if (result.isSucceed) {
                    this.source.refresh();
                } else {
                    this.showErrors(result.errors, result.ex);
                }
            },
            error => { });
    }
    showErrors(errors: string[], ex: any) {
    };

}
