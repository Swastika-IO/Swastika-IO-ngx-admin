import { Component, Inject } from '@angular/core';
import { Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ModuleService } from '../module.service';
import { PagingData, ModuleListItem } from '../../../@swastika-io/viewmodels/article.viewmodels';

import { DOCUMENT } from '@angular/platform-browser';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from 'app/pages/components/data-render/data-render.components';
import { environment } from 'environments/environment';
import { ServerDataSource } from 'app/@swastika-io/components/smart-table-server-data-source/server-data-source.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StorageService } from 'app/@swastika-io/helpers/localStorage.service';
import { ServiceHelper } from 'app/@swastika-io/helpers/sw.service.helper';

@Component({
  selector: 'ngx-list-module',
  templateUrl: './list-module.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
  entryComponents: [
    ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent,
  ]
})
export class ListModuleComponent {

  settings = {
    mode: 'external',
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
    columns: {
      id: {
        title: 'ID',
        type: 'string',
        filter: false,
      },
      specificulture: {
        title: 'Culture',
        type: 'string',
        filter: false,
      },
      template: {
        title: 'Template',
        type: 'string',
        filter: false,
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      description: {
        title: 'description',
        type: 'string',
      },
    },
    actions: {
      add: true,
    },
  };

  source: ServerDataSource;
  data: ModuleListItem[];
  pagingData = new PagingData();
  constructor(private router: Router, private http: Http
    , private service: ModuleService
    , private serviceHelper: ServiceHelper
    , private spinnerSerice: Ng4LoadingSpinnerService
    , private storageService: StorageService  
  ) {
    this.pagingData.pageIndex = 0;
    this.pagingData.pageSize = 15;
    this.pagingData.endPoint = environment.apiUrl + environment.culture + '/modules';

    // this.fetchData(this.pagingData.pageSize, this.pagingData.pageIndex);
  }

  ngOnInit(): void {
    this.source = new ServerDataSource(this.http
      , this.serviceHelper
      , this.storageService
      , this.spinnerSerice
      , {
        endPoint: this.pagingData.endPoint,
        dataKey: 'data.items',
        pagerLimitKey: 'data.pageSize',
        pagerPageKey: 'data.pageIndex',
        totalKey: 'data.totalItems',

      },
    );
  };
  delete(event): void {
    this.service.deleteModuleWithPromise('vi-vn', event.data.id)
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
  onCreate(event): void {
    this.router.navigate(['/pages/modules/create-module']);
  };
  onEdit(event): void {
    this.router.navigate(['/pages/modules/create-module', event.data.id]);
  };
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.delete(event);
    }
  };
}



