/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import "es6-shim";
import { AnalyticsService } from './@core/utils/analytics.service';
import { environment } from '../environments/environment';
import { ToasterConfig } from 'angular2-toaster';
import { CookieStorage, LocalStorage, SessionStorage } from 'ngx-store';
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet><app-spinner> </app-spinner><toaster-container [toasterconfig]="toasterconfig"></toaster-container>',
})
export class AppComponent implements OnInit {
  isBusy: boolean;
  toasterconfig: ToasterConfig = new ToasterConfig({ animation: 'fade' });
  constructor(private analytics: AnalyticsService) {
    this.isBusy = environment.isBusy;
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
