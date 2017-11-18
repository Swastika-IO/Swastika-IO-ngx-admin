import { Component } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LocalDataSource } from 'ng2-smart-table';
import { RequestOptionsArgs } from '@angular/http/src/interfaces';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { getDeepFromObject } from 'ng2-smart-table/lib/helpers';
import { environment } from 'environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { AccessTokenViewModel } from 'app/@swastika-io/viewmodels/article.viewmodels';
import { StorageService } from 'app/@swastika-io/helpers/localStorage.service';
import { ServiceHelper } from 'app/@swastika-io/helpers/sw.service.helper';

export class ServerDataSource extends LocalDataSource {
    private accessToken: AccessTokenViewModel;
    protected data: Array<any> = [];

    protected sortConf: Array<any> = [];

    protected filterConf: any = {
        filters: [],
        andOperator: true,
    };

    protected pagingConf: any = {};

    protected timeoutHandler: any;
    protected isLoading = false;

    protected conf: any = {
        endPoint: '',
        sortFieldKey: 'id',
        sortDirKey: '0',
        pagerPageKey: 'data.pageIndex',
        pagerLimitKey: 'data.pageSize',
        filterFieldKey: '#field#_like',
        totalKey: 'data.totalItems',
        dataKey: 'data.items',
    };

    protected lastRequestCount: number = 0;

    constructor(protected _http: Http
        , private serviceHelper: ServiceHelper
        , private storageService: StorageService
        , private spinnerSerice: Ng4LoadingSpinnerService
        , conf: any
    ) {
        super();
        var token = this.storageService.getLocalData(environment.localStorageKeys.accessToken);
        this.accessToken = JSON.parse(token) as AccessTokenViewModel;
        if (conf == undefined) {
            conf = environment.pagingConfig;
        }
        this.conf = conf;

        if (!this.conf.endPoint) {
            throw new Error('At least endPoint must be specified as a configuration of the server data source.');
        }

        super.refresh();
    }

    count(): number {
        return this.lastRequestCount;
    }

    getElements(): Promise<any> {
        this.spinnerSerice.show();
        return this.requestElements()
            .map(res => {
                this.lastRequestCount = this.extractTotalFromResponse(res, this.spinnerSerice);
                this.data = this.extractDataFromResponse(res, this.spinnerSerice);
                this.spinnerSerice.hide();
                return this.data;
            })
            .catch(error => {
                return Observable.throw(error).catch(err => Observable.of(err))
                    .map(err => {
                        if (err.status == 401) {
                            
                            this.serviceHelper.refreshToken()
                                .then(r => {
                                    this.spinnerSerice.hide();                                         
                                    return this.requestElements()
                                        .map(r1 => {
                                            this.lastRequestCount = this.extractTotalFromResponse(r1, this.spinnerSerice);
                                            this.data = this.extractDataFromResponse(r1, this.spinnerSerice);
                                            this.refresh();
                                            this.spinnerSerice.hide();
                                        }).toPromise();
                                        
                                })
                        }
                        else {
                            this.spinnerSerice.hide();
                            return [];
                            
                        }
                    });

            })
            .toPromise();
    }

    /**
     * Extracts array of data from server response
     * @param res
     * @returns {any}
     */
    protected extractDataFromResponse(res: any, spinnerSerice: Ng4LoadingSpinnerService): Array<any> {
        spinnerSerice.hide();
        const rawData = res.json();
        const data = this.conf.dataKey ? getDeepFromObject(rawData, this.conf.dataKey, []) : rawData;

        if (data instanceof Array) {
            return data;
        }

        throw new Error(`Data must be an array.
     Please check that data extracted from the server response by the key
      '${this.conf.dataKey}' exists and is array.`);
    }

    /**
     * Extracts total rows count from the server response
     * Looks for the count in the headers first, then in the response body
     * @param res
     * @returns {any}
     */
    protected extractTotalFromResponse(res: any, spinnerSerice: Ng4LoadingSpinnerService): number {
        spinnerSerice.hide();
        if (res.headers.has(this.conf.totalKey)) {
            return +res.headers.get(this.conf.totalKey);
        } else {
            const rawData = res.json();
            return getDeepFromObject(rawData, this.conf.totalKey, 0);
        }

    }

    protected requestElements(): Observable<any> {
        return this._http.get(this.conf.endPoint, this.createRequestOptions());
    }

    protected createRequestOptions(): RequestOptionsArgs {
        var token = this.storageService.getLocalData(environment.localStorageKeys.accessToken);
        var accessToken = JSON.parse(token) as AccessTokenViewModel;
        let requestOptions: RequestOptionsArgs = {};
        requestOptions.search = new URLSearchParams();
        requestOptions.url = this.conf.endPoint;
        requestOptions = this.addPagerRequestOptions(requestOptions);
        requestOptions = this.addSortRequestOptions(requestOptions);
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': accessToken.token_type + ' ' + accessToken.access_token
            });
        requestOptions.headers = headers;
        return this.addFilterRequestOptions(requestOptions);
    }

    protected addSortRequestOptions(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
        const searchParams: URLSearchParams = <URLSearchParams>requestOptions.search;

        if (this.sortConf) {
            this.sortConf.forEach((fieldConf) => {
                requestOptions.url += '/' + fieldConf.field + '/' + (fieldConf.direction === 'asc' ? 0 : 1);
                // searchParams.set(this.conf.sortFieldKey, fieldConf.field);
                // searchParams.set(this.conf.sortDirKey, fieldConf.direction.toUpperCase());
            });
        }

        return requestOptions;
    }

    protected addFilterRequestOptions(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
        const searchParams: URLSearchParams = <URLSearchParams>requestOptions.search;

        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf: any) => {
                var keyword = ' ';
                if (fieldConf['search']) {
                    keyword = fieldConf['search'];
                    // searchParams.set(this.conf.filterFieldKey.replace('#field#', fieldConf['field']), fieldConf['search']);
                }
                requestOptions.url += '/' + keyword;
            });
        }

        return requestOptions;
    }

    protected addPagerRequestOptions(requestOptions: RequestOptionsArgs): RequestOptionsArgs {
        const searchParams: URLSearchParams = <URLSearchParams>requestOptions.search;

        if (this.pagingConf && this.pagingConf['page'] && this.pagingConf['perPage']) {
            requestOptions.url += '/' + this.pagingConf['perPage'] + '/' + (this.pagingConf['page'] - 1);
            // searchParams.set(this.conf.pagerPageKey, this.pagingConf['page']);
            // searchParams.set(this.conf.pagerLimitKey, this.pagingConf['perPage']);
        }

        return requestOptions;
    }

    protected refreshData(action: string): void {
        if (!this.isLoading) {
            this.isLoading = true;

            this.getElements().then((elements) => {
                if (elements != undefined) {

                    this.onChangedSource.next({
                        action: action,
                        elements: elements,
                        paging: this.getPaging(),
                        filter: this.getFilter(),
                        sort: this.getSort(),
                    });
                }
                this.isLoading = false;
            });
        }
    }

    protected emitOnChanged(action: string): void {

        if (this.timeoutHandler) {
            clearTimeout(this.timeoutHandler);
        }
        this.timeoutHandler = setTimeout(() => {
            this.refreshData(action);
        }, action !== 'refresh' ? 500 : 0);
    }
}


@Component({
    selector: 'ngx-components',
    template: `
    <router-outlet></router-outlet>
  `,
})
export class ComponentsComponent {
}
