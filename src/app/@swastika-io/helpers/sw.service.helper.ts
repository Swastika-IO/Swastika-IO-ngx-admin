import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import { ApiResult, LoginViewModel, AccessTokenViewModel } from '../../@swastika-io/viewmodels/article.viewmodels';

import { environment } from '../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationService } from './notifications.service';
import { StorageService } from './localStorage.service';
import { CookieStorage, LocalStorage, SessionStorage, WebstorableArray } from 'ngx-store';
import { Router } from '@angular/router';

@Injectable()
export class ServiceHelper {
    private accessToken: AccessTokenViewModel;
    errors: string[] = [];
    domain = environment.domain;
    constructor(private http: Http
        , private spinnerService: Ng4LoadingSpinnerService
        , private notificationService: NotificationService
        , private storageService: StorageService
        , private router: Router
    ) {
        var token = this.storageService.getLocalData(environment.localStorageKeys.accessToken);
        this.accessToken = JSON.parse(token) as AccessTokenViewModel;
    }

    getWithPromise(apiUrl: string, params: any = null): Promise<ApiResult> {
        this.spinnerService.show();
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': this.accessToken.token_type + ' ' + this.accessToken.access_token
            });
        // headers['Access-Control-Allow-Origin'] = '*'
        let options = new RequestOptions(
            {
                method: RequestMethod.Get,
                url: apiUrl,
                headers: headers
            }
        );
        options.params = params;
        var request = this.http.request(apiUrl, options);

        return request
            .map(
            result => this.extractData(options, result, this.spinnerService
            ))
            // .retryWhen(errors => errors.delay(5000).scan(function (errorCount, err)
            // {
            //     this.refreshToken(options)
            // }).take(1))
            .catch(errors => Observable.of(this.handleErrorPromise(options, errors, this.spinnerService)))// this.handleErrorPromise(options, errors, this.spinnerService))
            .toPromise();

    }

    postWithPromise(apiUrl: string, body: any): Promise<ApiResult> {
        let headers = new Headers(
            {
                'Content-Type': 'application/json',
                'Authorization': this.accessToken.token_type + ' ' + this.accessToken.access_token
            });
        // headers['Access-Control-Allow-Origin'] = '*'
        let options = new RequestOptions(
            {
                method: RequestMethod.Post,
                url: apiUrl,
                headers: headers,
                body: body
            }
        );
        this.spinnerService.show();
        var request = this.http.request(apiUrl, options);
        return request.toPromise()
            .then(result => this.extractData(options, result, this.spinnerService))
            .catch(errors => this.handleErrorPromise(options, errors, this.spinnerService));
    }
    extractData(request: RequestOptions, res: Response, service: Ng4LoadingSpinnerService) {
        const body = res.json();
        service.hide()
        if (body.isSucceed) {

        } else {
            this.showErrors(body.errors)
        }

        return body || {};
    }

    handleErrorPromise(options: RequestOptions, error: Response | any, spinnerService: Ng4LoadingSpinnerService) {
        // console.error(error.message || error);
        spinnerService.hide()

        // Handle UnAuthorized request (try 1 more time using refresh_token)
        if (error.status == 401) {
            if (this.accessToken.refresh_token == undefined) {
                this.login();
            }
            else {
                return this.refreshToken(options);
            }
        }


        // this.errors.push(error.message);
        this.showErrors([error.message]);
        return Promise.reject(error.message || error).then(error => { this.spinnerService.hide() });
    }

    refreshToken(options: RequestOptions = null): Promise<any> {
        const getTokenUrl = this.domain + 'api/' + environment.culture + '/account/refreshToken/' +
            this.accessToken.refresh_token;

        return this.getWithPromise(getTokenUrl)
            .then(result => {
                if (result.isSucceed) {
                    this.accessToken = result.data;
                    this.storageService.saveLocalData(environment.localStorageKeys.accessToken, result.data);
                    if (options != null) {
                        this.accessToken = result.data;
                        let headers = new Headers(
                            {
                                'Content-Type': 'application/json',
                                'Authorization': this.accessToken.token_type + ' ' + this.accessToken.access_token
                            });
                        options.headers = headers;
                        var req = this.http.request(options.url, options);
                        return req.toPromise()
                            .then(result => this.extractData(options, result, this.spinnerService))
                            .catch(errors => this.handleErrorPromise(options, errors, this.spinnerService));
                    }
                } else {
                    this.login();
                }
            });
    }
    login(): void {
        const saveUrl = this.domain + 'api/' + environment.culture + '/account/login';
        var login = new LoginViewModel();
        login.email = 'nhathoang989@gmail.com';
        login.password = '1234qwe@';

        this.postWithPromise(saveUrl, login)
            .then(result => {
                this.accessToken = result.data;
                this.storageService.saveLocalData(environment.localStorageKeys.accessToken, result.data);
            });
    }
    logout(): void {
        this.storageService.clearLocalData(environment.localStorageKeys.accessToken);
        this.router.navigate(['/pages/articles/list-articles']);
    }
    showErrors(errors: string[]): void {
        if (errors) {
            errors.forEach(element => {
                this.notificationService.makeToast('error', '', element);
            });
        }
    }
}

