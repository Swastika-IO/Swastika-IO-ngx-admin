import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import { ApiResult, ArticleBackend, ArticleListItem } from '../../@swastika-io/viewmodels/article.viewmodels';

import { environment } from '../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ServiceHelper } from 'app/@swastika-io/helpers/sw.service.helper';

@Injectable()
export class ArticleService {
    domain = environment.domain;
    constructor(private http: Http
        , private serviceHelper: ServiceHelper
        // , private spinnerSerice: Ng4LoadingSpinnerService
    ) {
    }

    getArticlesWithPromise(culture: string, pageSize: number, pageIndex: number): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/' + pageSize + '/' + pageIndex;
        return this.serviceHelper.getWithPromise(getUrl);        
    }

    getArticleWithPromise(culture: string, id: string): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/edit/' + id;
        return this.serviceHelper.getWithPromise(getUrl);
    }

    saveArticleWithPromise(culture: string, article: ArticleBackend): Promise<ApiResult> {
        const saveUrl = this.domain + 'api/' + culture + '/articles/save';       
        return this.serviceHelper.postWithPromise(saveUrl, article);
    }

    getDefaultArticleWithPromise(culture: string): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/create';
        return this.serviceHelper.getWithPromise(getUrl);
    }

    deleteArticleWithPromise(culture: string, id: string): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/delete/' + id;
        return this.serviceHelper.getWithPromise(getUrl);
    }

    recycleArticleWithPromise(culture: string, id: string): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/recycle/' + id;
        return this.serviceHelper.getWithPromise(getUrl);
    }

    restoreArticleWithPromise(culture: string, id: string): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/restore/' + id;
        return this.serviceHelper.getWithPromise(getUrl);
    }
}

