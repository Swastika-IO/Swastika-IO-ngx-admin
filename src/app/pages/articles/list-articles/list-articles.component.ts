import { Component, Inject } from '@angular/core';
import { Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ArticleService } from '../article.services';
import { PagingData, ArticleListItem, AccessTokenViewModel } from '../../../@swastika-io/viewmodels/article.viewmodels';
import { ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent } from '../../components/data-render/data-render.components';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { CookieStorage, SharedStorage, LocalStorage, SessionStorage, WebstorableArray } from 'ngx-store';
import { ServerDataSource } from 'app/@swastika-io/components/smart-table-server-data-source/server-data-source.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { StorageService } from 'app/@swastika-io/helpers/localStorage.service';
import { ServiceHelper } from 'app/@swastika-io/helpers/sw.service.helper';

@Component({
  selector: 'ngx-list-articles',
  templateUrl: './list-articles.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
  entryComponents: [
    ImageRenderComponent, DatetimeRenderComponent, HtmlRenderComponent,
  ]

})
export class ListArticlesComponent {
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
    },
  };

  source: ServerDataSource;
  data: ArticleListItem[];
  pagingData = new PagingData();

  constructor(
    private router: Router
    , private http: Http
    , private service: ArticleService
    , private serviceHelper: ServiceHelper
    , private spinnerSerice: Ng4LoadingSpinnerService
    , private storageService: StorageService
  ) {
    this.pagingData.pageIndex = 0;
    this.pagingData.pageSize = 15;
    this.pagingData.endPoint = environment.apiUrl + environment.culture + '/articles';
    // this.fetchData(this.pagingData.pageSize, this.pagingData.pageIndex);
  }

  ngOnInit(): void {
    // this.fetchData(10, 0);
    this.source = new ServerDataSource(
      this.http
      , this.serviceHelper
      , this.storageService
      , this.spinnerSerice
      , {
        endPoint: this.pagingData.endPoint,
        dataKey: 'data.items',
        pagerLimitKey: 'data.pageSize',
        pagerPageKey: 'data.pageIndex',
        totalKey: 'data.totalItems',

      }
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
    this.service.recycleArticleWithPromise('vi-vn', event.data.id)
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
  onEdit(event): void {
    this.router.navigate(['/pages/articles/create-article', event.data.id]);
  };
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.delete(event);
    }
  };
}



