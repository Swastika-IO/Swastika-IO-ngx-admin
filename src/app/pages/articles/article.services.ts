import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import { ApiResult, ArticleBackend, ArticleListItem } from '../../@swastika-io/viewmodels/article.viewmodels';

import { environment } from '../../../environments/environment';

@Injectable()
export class ArticleService {
    domain = environment.domain;
    constructor(private http: Http) {

    }

    getArticlesWithPromise(culture: string, pageSize: number, pageIndex: number): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/' + pageSize + '/' + pageIndex;
        return this.http.get(getUrl).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getArticleWithPromise(culture: string, id: string): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/edit/' + id;
        return this.http.get(getUrl).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    saveArticleWithPromise(culture: string, article: ArticleBackend): Promise<ApiResult> {
        const saveUrl = this.domain + 'api/' + culture + '/articles/save';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers['Access-Control-Allow-Origin'] = '*'
        let options = new RequestOptions({ headers: headers });

        return this.http.post(saveUrl, article, options).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getDefaultArticleWithPromise(culture: string): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/create';
        return this.http.get(getUrl).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    deleteArticleWithPromise(culture: string, id: string): Promise<ApiResult> {
        const getUrl = this.domain + 'api/' + culture + '/articles/delete' + id;
        return this.http.get(getUrl).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    private extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}

