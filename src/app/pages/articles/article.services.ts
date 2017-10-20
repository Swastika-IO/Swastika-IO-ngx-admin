import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ArticleBackend, ArticleListItem } from './article.viewmodels';
@Injectable()

export class ArticleService {
    domain = "http://localhost:54920/";
    constructor(private http: Http) {

    }

    getArticlesWithPromise(culture: string, pageSize: number, pageIndex: number): Promise<ArticleListItem[]> {
        let getUrl = this.domain + "api/" + culture + "/articles/" + pageSize + "/" + pageIndex;
        return this.http.get(getUrl).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    getArticleWithPromise(culture: string, id: string): Promise<ArticleBackend> {
        let getUrl = this.domain + "api/" + culture + "/articles/" + id;
        return this.http.get(getUrl).toPromise()
            .then(this.extractData)
            .catch(this.handleErrorPromise);
    }

    private extractData(res: Response) {
        let body = res.json();
        return ( body.isSucceed && body.data) || {};
    }

    private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
    }
}