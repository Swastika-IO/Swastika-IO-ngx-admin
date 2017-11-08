/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { NbSpinnerService } from '@nebular/theme';
export const environment = {
  production: true,
  spinnerServices: new NbSpinnerService(),
  apiUrl: "http://localhost:2089/",
  domain: "http://localhost:2089/",
  culture: 'vi-vn',
  pagingConfig: {
    endPoint: this.apiUrl,
    dataKey: 'data.items',
    pagerLimitKey: 'data.pageSize',
    pagerPageKey: 'data.pageIndex',
    totalKey: 'data.totalItems',

  }
};
