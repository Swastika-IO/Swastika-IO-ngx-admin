import { Component } from '@angular/core';
import { Input, OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ArticleService } from '../article.services';
import { PagingData, ArticleListItem } from '../article.viewmodels';
import { ImageRenderComponent, DatetimeRenderComponent } from '../../components/data-render/data-render.components';

import { ServerDataSource  } from '../../components/components.component';
@Component({
  selector: 'ngx-list-articles',
  templateUrl: './list-articles.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
  entryComponents: [
    ImageRenderComponent,
    DatetimeRenderComponent
  ]
})
export class ListArticlesComponent {

  settings = {
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
      thumbnail: {
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
  };

  source: ServerDataSource;// = new LocalDataSource();
  data: ArticleListItem[];
  pagingData = new PagingData();
  constructor(private http: Http, private service: ArticleService) {
    this.pagingData.pageIndex = 0;
    this.pagingData.pageSize = 15;
    this.pagingData.endPoint = "http://localhost:54920/api/vi-vn/articles"

    // this.fetchData(this.pagingData.pageSize, this.pagingData.pageIndex);
  }

  ngOnInit(): void {
    console.log('init');
    let endPoint = this.pagingData.endPoint;// + "/" + this.pagingData.pageSize + "/" + this.pagingData.pageIndex;
    this.source = new ServerDataSource(this.http,
      {
        endPoint: endPoint,
        dataKey: 'data.items',
        pagerLimitKey: 'data.pageSize',
        pagerPageKey: 'data.pageIndex',
        totalKey: 'data.totalItems',

      }

    );
    this.source.getElements();
  };
  fetchData(pageSize: number, pageIndex: number): void {
    this.service.getArticlesWithPromise('vi-vn', pageSize, pageIndex)
      .then(data => { this.data = data; this.source.load(data); },
      error => { });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}



