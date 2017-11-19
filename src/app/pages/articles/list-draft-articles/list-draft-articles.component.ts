import { Component, Inject } from '@angular/core';
import { Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ArticleService } from '../article.services';
import { PagingData, ArticleListItem } from '../../../@swastika-io/viewmodels/article.viewmodels';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../../components/data-render/data-render.components';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { ServerDataSource } from 'app/@swastika-io/components/smart-table-server-data-source/server-data-source.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StorageService } from 'app/@swastika-io/helpers/localStorage.service';
import { ServiceHelper } from 'app/@swastika-io/helpers/sw.service.helper';

@Component({
  selector: 'ngx-list-articles',
  templateUrl: './list-draft-articles.component.html',
  styleUrls: ['./list-draft-articles.component.scss'],
  entryComponents: [
    ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent,
  ]

})
export class ListDraftArticlesComponent {

  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="ion-reply"></i>',
      confirmDelete: true,
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
      thumbnailUrl: {
        title: 'thumbnail',
        type: 'custom',
        renderComponent: ImageRenderComponent,
        filter: false,
      },
      title: {
        title: 'Title',
        type: 'string',
      },
      createdDateTime: {
        title: 'Created Date',
        type: 'custom',
        renderComponent: DatetimeRenderComponent,
        filter: false,
      },
    },
    actions: {
      add: true,
      edit: true,
      delete: true,

      // custom: [
      //   {
      //     name: 'delete',
      //     title: '<i class="nb-trash"></i>',
      //   },
      //   {
      //     name: 'restore',
      //     title: '<i class="ion-reply"></i>',
      //   },

      // ]
    },
  };

  source: ServerDataSource;
  data: ArticleListItem[];
  pagingData = new PagingData();

  constructor(private router: Router, private http: Http, private service: ArticleService,
    @Inject(DOCUMENT) private document: Document
    , private serviceHelper: ServiceHelper
    , private spinnerSerice: Ng4LoadingSpinnerService
    , private storageService: StorageService
  ) {
    this.pagingData.pageIndex = 0;
    this.pagingData.pageSize = 15;
    this.pagingData.endPoint = environment.apiUrl + environment.culture + '/articles/draft'

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

  fetchData(pageSize: number, pageIndex: number): void {
    this.service.getArticlesWithPromise('vi-vn', pageSize, pageIndex)
      .then(result => {
        if (result.isSucceed) {
          this.data = result.data;
        } else {
          this.showErrors(result.errors, result.ex);
        }
      },
      error => { });
  }

  delete(event): void {
    this.service.deleteArticleWithPromise('vi-vn', event.data.id)
      .then(result => {
        if (result.isSucceed) {
          this.source.refresh();
        } else {
          this.showErrors(result.errors, result.ex);
        }
      },
      error => { });
  }

  restore(event): void {
    this.service.restoreArticleWithPromise('vi-vn', event.data.id)
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
    this.router.navigate(['/pages/articles/create-article']);
  };
  onCustom(event): void {
    switch (event.action) {
      case 'edit':
        if (window.confirm('Are you sure you want to restore?')) {
          this.restore(event);
        }
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete?')) {
          this.delete(event);
        }
        break;
      default:
        break;
    }

  };
  onEditConfirm(event): void {
    if (window.confirm('Are you sure you want to restore?')) {
      this.restore(event);
    }
  };
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.delete(event);
    }
  };
}



