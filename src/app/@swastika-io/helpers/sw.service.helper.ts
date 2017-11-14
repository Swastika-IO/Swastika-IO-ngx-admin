import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/fromPromise';
import { ApiResult } from '../../@swastika-io/viewmodels/article.viewmodels';

import { environment } from '../../../environments/environment';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NotificationService } from './notifications.service';

@Injectable()
export class ServiceHelper {
    public spinnerService: Ng4LoadingSpinnerService;
    errors: string[] = [];
    domain = environment.domain;
    constructor(private http: Http
        , spinnerSerice: Ng4LoadingSpinnerService
        , private notificationService: NotificationService
    ) {
        this.spinnerService = spinnerSerice;
    }

    getWithPromise(apiUrl: string): Promise<ApiResult> {    
        
        return this.http.get(apiUrl).toPromise()
            .then(
            result => this.extractData(result, this.spinnerService
            ))
            .catch(errors => this.handleErrorPromise(errors, this.spinnerService));

    }

    postWithPromise(apiUrl: string, body: any): Promise<ApiResult> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        // headers['Access-Control-Allow-Origin'] = '*'
        let options = new RequestOptions({ headers: headers });
        this.spinnerService.show();
        return this.http.post(apiUrl, body, options).toPromise()
            .then(result => this.extractData(result, this.spinnerService))
            .catch(errors => this.handleErrorPromise(errors, this.spinnerService));
    }
    private extractData(res: Response, service: Ng4LoadingSpinnerService) {
        const body = res.json();
        service.hide()
           
        if (body.isSucceed) {
            
        } else{
            this.showErrors(body.errors) 
        }
        
        return body || {};
    }

    private handleErrorPromise(error: Response | any, spinnerService: Ng4LoadingSpinnerService) {
        // console.error(error.message || error);
        spinnerService.hide()
        // this.errors.push(error.message);
        this.showErrors([error.message]);
        return Promise.reject(error.message || error).then(error => { this.spinnerService.hide() });
    }

    showErrors(errors: string[]): void {
        if (errors) {
            errors.forEach(element => {                
                this.notificationService.makeToast('error', '', element);
            });
        }

    }
}

