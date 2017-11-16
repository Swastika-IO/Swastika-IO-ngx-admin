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

@Injectable()
export class ServiceHelper {
    private accessToken: AccessTokenViewModel;
    public spinnerService: Ng4LoadingSpinnerService;
    errors: string[] = [];
    domain = environment.domain;
    constructor(private http: Http
        , spinnerSerice: Ng4LoadingSpinnerService
        , private notificationService: NotificationService
        , private storageService: StorageService
    ) {
        this.spinnerService = spinnerSerice;
        var token = this.storageService.getLocalData('accessToken');        
        this.accessToken =  JSON.parse(token) as AccessTokenViewModel;
    }

    getWithPromise(apiUrl: string): Promise<ApiResult> {
        console.log(this.accessToken, this.accessToken.token_type + ' ' + this.accessToken.access_token);
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
        var request = this.http.request(apiUrl, options);

        return request.toPromise()
            .then(
            result => this.extractData(request, result, this.spinnerService
            ))
            .catch(errors => this.handleErrorPromise(request, errors, this.spinnerService));

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
                headers: headers
            }
        );
        this.spinnerService.show();
        var request = this.http.post(apiUrl, body, options);
        return request.toPromise()
            .then(result => this.extractData(request, result, this.spinnerService))
            .catch(errors => this.handleErrorPromise(request, errors, this.spinnerService));
    }
    private extractData(request: any, res: Response, service: Ng4LoadingSpinnerService) {
        const body = res.json();
        service.hide()
        if (body.isSucceed) {

        } else {
            this.showErrors(body.errors)
        }

        return body || {};
    }

    private handleErrorPromise(request: any, error: Response | any, spinnerService: Ng4LoadingSpinnerService) {
        // console.error(error.message || error);
        spinnerService.hide()
        if (error.status == 401) {
            if (environment.accessToken.refresh_token == undefined) {
                this.login();
            }
            else {
                const getTokenUrl = this.domain + 'api/' + environment.culture + '/account/refreshToken/' +
                    environment.accessToken.refresh_token;
                var login = new LoginViewModel();
                this.getWithPromise(getTokenUrl)
                    .then(result => {
                        environment.accessToken = result.data;
                    });
            }
        }


        // this.errors.push(error.message);
        this.showErrors([error.message]);
        return Promise.reject(error.message || error).then(error => { this.spinnerService.hide() });
    }
    login(): void {
        const saveUrl = this.domain + 'api/' + environment.culture + '/account/login';
        var login = new LoginViewModel();
        login.email = 'nhathoang989@gmail.com';
        login.password = '1234qwe@';
        
        this.postWithPromise(saveUrl, login)
            .then(result => {
                environment.accessToken = result.data;
                this.storageService.saveLocalData('accessToken', result.data);
                this.accessToken = environment.accessToken;
            });
    }
    showErrors(errors: string[]): void {
        if (errors) {
            errors.forEach(element => {
                this.notificationService.makeToast('error', '', element);
            });
        }
    }
}

