/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import "es6-shim";
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbSpinnerService } from '@nebular/theme';
@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,
              private spinnerService: NbSpinnerService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
